import { Auth } from 'aws-amplify';
import axios from 'axios';
import Cookies from "js-cookie";
import { setGlobalState } from '../state/state';
const backendUrl = 'http://localhost:4000'

const signOutUtil = async () => {
  try {
    await axios(`${backendUrl}/api/user/logout`)
  } catch (error) {
    console.log('error signing out: ', error);
  }
  setGlobalState('user', null)
  Cookies.remove('username')
  return await Auth.signOut();
}

export default signOutUtil