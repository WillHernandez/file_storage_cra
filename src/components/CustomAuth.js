import { Amplify, Auth } from 'aws-amplify'
import axios from 'axios'
import awsExports from '../aws-exports'
import { Authenticator } from '@aws-amplify/ui-react'
import { useIdleTimer } from 'react-idle-timer'
import Cookies from 'js-cookie'
import signOutUtil from '../utils/signOut'
import '@aws-amplify/ui-react/styles.css'
axios.defaults.withCredentials = true
Amplify.configure(awsExports)

// https://ui.docs.amplify.aws/react/connected-components/authenticator/customization
const url = "http://localhost:4000"

export default function CustomAuth() {
  const onIdle = () => { Auth.signOut() }
	useIdleTimer({ onIdle, disabled: !Cookies.get('username'), timeout: 3600000 }) // 1hr timeout

  const services = {
    async handleSignUp(formData) {
      let { username, password, attributes } = formData
      username = username.toLowerCase();
      attributes.email = attributes.email.toLowerCase()
      return await Auth.signUp({
        username,
        password,
        attributes,
        autoSignIn: {
          enabled: true,
        }
      })
    },

    async handleConfirmSignUp(formData) {
      let { username, code } = formData
      username = username.toLowerCase()
      const u = username; const c = code
      return await Auth.confirmSignUp(u,c)
    },
    
		async handleSignIn(formData) {
      let { username, password } = formData
      username = username.toLowerCase()
			const cognitoRes = await Auth.signIn({
        username,
        password
      });

      const dbData = {
        'username': cognitoRes.attributes.email,
        'sub': cognitoRes.attributes.sub,
        'accessToken': cognitoRes.signInUserSession.accessToken.jwtToken, 
        // 'idToken': cognitoRes.signInUserSession.idToken.jwtToken,
        // 'refreshToken': cognitoRes.signInUserSession.refreshToken.token 
      }

      for(const prop in dbData) { Cookies.set(prop, dbData[prop]) }

      const user = Cookies.get('username')
      console.log(user);

      try {
        await axios(`${url}/api/login`) 
      } catch (e) {
        console.log(e);
      }

			return cognitoRes
    },
  };

  return (
    <Authenticator services={services} initialState="signIn">
      {() => <button onClick={signOutUtil}>Sign out</button>}
    </Authenticator>
  );
}