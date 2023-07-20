import { Navigate } from 'react-router-dom'

const MainRoutes = ({user, userCookie, children}) => {
	if(user || userCookie) {
		return <Navigate to="/profile" />
	}
	return children
}

export default MainRoutes
