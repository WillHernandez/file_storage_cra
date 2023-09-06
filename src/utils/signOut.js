import { Auth } from 'aws-amplify';
import axios from 'axios';
import { setGlobalState } from '../state/state';
const backendUrl = "https://file-storage-backend-original.onrender.com"

const signOutUtil = async () => {
  try {
    await axios(`${backendUrl}/api/user/logout`)
  } catch (error) {
    console.log('error signing out: ', error);
  }
  setGlobalState('user', null)
  localStorage.clear()
  return await Auth.signOut();
}

export default signOutUtil