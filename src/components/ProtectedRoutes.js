import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({user, userCookie, children}) => {
	if(!user && !userCookie) {
		return <Navigate to='/' />
	}
	return children
}

export default ProtectedRoutes
