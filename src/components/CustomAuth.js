import { Amplify, Auth } from 'aws-amplify'
import axios from 'axios'
import awsExports from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
import { useIdleTimer } from 'react-idle-timer'
import signOutUtil from '../utils/signOut'
import '@aws-amplify/ui-react/styles.css'
import { setGlobalState } from '../state/state'
import { useNavigate } from 'react-router-dom'
Amplify.configure(awsExports)
// const backendUrl = "https://file-storage-backend-original.onrender.com"
const backendUrl = "http://localhost:4000"

export default function CustomAuth() {
  const onIdle = () => { signOutUtil() }
  useIdleTimer({ onIdle, disabled: !localStorage.getItem('username'), timeout: 3600000 })
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
    
    // test to make sure that a user is both confirmed and signed in with an approprite token returned
    async handleConfirmSignUp(formData) { 
      let { username, code } = formData
      username = username.toLowerCase()

      const confirmSignupRes = await Auth.confirmSignUp(username, code)
      const signinRes = await Auth.signIn(username, globalPass)
      const user = {
        username: signinRes.attributes.email,
        awsToken: signinRes.signInUserSession.accessToken
      }
      if (confirmSignupRes === "SUCCESS") {
        await axios.post(`${backendUrl}/api/user/newuser`, user)
        const accessToken = await axios.post(`${backendUrl}/api/user/login`, user)
        user.accessToken = accessToken.data
        setCreds(user)
      }
      navigate('/profile')
      return confirmSignupRes
    },

    async handleSignIn(formData) {
      let { username, password } = formData
      username = username.toLowerCase()
      const cognitoRes = await Auth.signIn({ username, password })
      const user = {
        username: cognitoRes.attributes.email,
        awsToken: cognitoRes.signInUserSession.accessToken.jwtToken
      }
      const accessToken = await axios.post(`${backendUrl}/api/user/login`, user)
      user.accessToken = accessToken.data
      setCreds(user)
      navigate('/profile')
      return cognitoRes
    },
  };

  const setCreds = res => {
    localStorage.setItem('username', res.username)
    localStorage.setItem('accessToken', res.accessToken)
    setGlobalState('user', res.username)
  }

  return (
    <Authenticator className='authComponent' services={services} initialState="signIn">
      {() => <button onClick={signOutUtil}>Sign out</button>}
    </Authenticator>
  );
}
