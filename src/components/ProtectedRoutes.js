import { Navigate, Outlet } from "react-router-dom"
import { useCookies } from 'react-cookie'

const ProtectedRoutes = () => {
  const [cookies, get] = useCookies(['cookie-name']);
	const isAuth = get('username')

	return(
		isAuth ? <Outlet /> : <Navigate to='/' />
	)
}

export default ProtectedRoutes