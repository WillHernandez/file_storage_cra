import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

const MainRoutes = ({ children }) => {
	const user = Cookies.get('username')
	if(user) {
		return <Navigate to="/profile" />
	}
	return children
}

export default MainRoutes
