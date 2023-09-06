import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({ children }) => {
	const user = localStorage.getItem('username')
	if(!user) {
		return <Navigate to='/' />
	}
	return children
}

export default ProtectedRoutes
