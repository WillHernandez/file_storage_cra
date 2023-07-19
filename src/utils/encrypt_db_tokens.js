// import jwt from "jsonwebtoken"
import axios from "axios"
import Cookies from "js-cookie"
axios.defaults.withCredentials = true

const sendDbTokens = dbData => {
	for(let key in dbData) {
		Cookies.set(`${key}`, `${dbData[key]}`, {secure: false, expires: 1, httpOnly: true })
	}

	axios.post('http://localhost:4000/encrypt')
	.catch(e => console.log({error: e}))
	// try {
	// 	await axios.post('http://localhost:4000/encrypt')
	// } catch(e) {
	// 	console.log({error: e});
	// }
	// .then(res => console.log(res.data))
	// .catch(e => console.log({error: e}))
}

export default sendDbTokens
