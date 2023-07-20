import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({user, children}) => {
	if(!user) {
		return <Navigate to='/' />
	}
	return children
}

export default ProtectedRoutes
