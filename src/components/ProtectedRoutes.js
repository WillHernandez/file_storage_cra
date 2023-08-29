import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const ProtectedRoutes = ({ children }) => {
	const user = Cookies.get('username')
	if(!user) {
		return <Navigate to='/' />
	}
	return children
}

export default ProtectedRoutes
