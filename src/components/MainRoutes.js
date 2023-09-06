import { Navigate } from 'react-router-dom'

const MainRoutes = ({ children }) => {
	const user = localStorage.getItem('username')
	if(user) {
		return <Navigate to="/profile" />
	}
	return children
}

export default MainRoutes
