require('dotenv').config()
const express = require("express")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")

const dbpath = path.join(__dirname,"data.db")

const app = express()
app.use(express.json())
app.use(cors())

let db 

const intialize = async () => {
    try{
      db = await open({
        filename:dbpath,
        driver:sqlite3.Database
      })
      
      // Creating userregistration table if it doesn't exist
      await db.run(`
        CREATE TABLE IF NOT EXISTS userregistration (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT UNIQUE,
          password TEXT,
          email TEXT
        );
      `);

      const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

    } catch (e){
        console.log(`dberror: ${e.message}`)
        process.exit(1)
    }
}

intialize()

// Registration route
app.post("/register", async (request, response) => {
    const { username, password, email } = request.body
    const selectUserQuery = `SELECT * FROM userregistration WHERE username = "${username}";`
    const dbUser = await db.get(selectUserQuery)
    if (dbUser === undefined) {
        if (password.length < 6) {
            response.status(400)
            response.send("Password is too short")
        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            const createUserQuery = `
            INSERT INTO
                userregistration (username, password, email)
            VALUES
                (
                "${username}",
                "${hashedPassword}",
                "${email}"
                );`
            await db.run(createUserQuery)
            response.send("User created successfully")
        }
    } else {
        response.status(400)
        response.send("User already exists")
    }
})

// Login route
app.post("/login", async (request,response) => {
    const {username,password} = request.body
    const query = `
    SELECT
    *
    FROM
    userregistration 
    WHERE 
    username = "${username}";`
    const getquery = await db.get(query)
    if(getquery === undefined){
        response.status(400)
        response.send("Invalid user")
    } else{
        const hashedpassword = await bcrypt.compare(password,getquery.password)
        if (hashedpassword === true){
            const payload = {username: username}
            const jwtToken = jwt.sign(payload, process.env.JWT_SECRET || "secret_key")
            response.send({jwtToken: jwtToken})
        }else{
            response.status(400)
            response.send("Invalid Password")
        }
    }
})