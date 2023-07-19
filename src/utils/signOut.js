import { Auth } from 'aws-amplify';
import axios from 'axios';

const signOutUtil = async () => {
  try {
    await axios('http://localhost:4000/api/logout')
  } catch (error) {
    console.log('error signing out: ', error);
  }
  return await Auth.signOut();
}

export default signOutUtil