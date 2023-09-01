import { Amplify, Auth } from 'aws-amplify'
import axios from 'axios'
import awsExports from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
import { useIdleTimer } from 'react-idle-timer'
import Cookies from 'js-cookie'
import signOutUtil from '../utils/signOut'
import '@aws-amplify/ui-react/styles.css'
import { setGlobalState } from '../state/state'
import { useNavigate } from 'react-router-dom'
axios.defaults.withCredentials = true // send cookies with each request
Amplify.configure(awsExports)
const  = 'https://neon-sundae-0c06f5.netlify.app'

export default function CustomAuth() {
  const onIdle = () => { signOutUtil() }
	useIdleTimer({ onIdle, disabled: !Cookies.get('username'), timeout: 3600000 })
  const navigate = useNavigate()

  let globalPass

  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase()
      globalPass = password

      return await Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: { enabled: true }
      })
    },

    async handleConfirmSignUp(formData) {
      let { username, code } = formData
      username = username.toLowerCase()

      const confirmSignupRes = await Auth.confirmSignUp(username, code)
      const signinRes = await Auth.signIn(username, globalPass)

      if(confirmSignupRes === "SUCCESS") {
        setCreds(signinRes)
        await axios.post(`${backendUrl}/api/user/newuser`)
      }
      navigate('/profile')
      return confirmSignupRes 
    },
    
		async handleSignIn(formData) {
      let { username, password } = formData
      username = username.toLowerCase()
			const cognitoRes = await Auth.signIn({ username, password })
      setCreds(cognitoRes)
      try {
        var req = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        };
        const res = await fetch('http://localhost:4000/api/user/login', req)
        console.log(res);
      } catch(e) {
        console.log(e.message);
      }
      
      navigate('/profile')
			return cognitoRes
    },
  };

  const setCreds = res => {
      Cookies.set('username', res.attributes.email)
      Cookies.set('accessToken', res.signInUserSession.accessToken.jwtToken)
      setGlobalState('user', res.attributes.email)
  }

  return (
    <Authenticator className='authComponent' services={services} initialState="signIn">
      {() => <button onClick={signOutUtil}>Sign out</button>}
    </Authenticator>
  );
}