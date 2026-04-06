import {useNavigate, useParams, useLocation} from 'react-router-dom'

const withRouter = Component => {
  const Wrapper = props => {
    const navigate = useNavigate()
    const params = useParams()
    const location = useLocation()

    return (
      <Component
        {...props}
        navigate={navigate}
        params={params}
        location={location}
      />
    )
  }

  return Wrapper
}

export default withRouter
