import { View, Menu, MenuItem, Divider } from '@aws-amplify/ui-react';
import signOutUtil from '../utils/signOut';
import Cookies from 'js-cookie';

const BurgerMenu = () => {
  const user = Cookies.get('username')
  return (
  	<View width="4rem">
    	<Menu>
        <MenuItem isDisabled > {user} </MenuItem>
        <Divider />
        <MenuItem onClick={() => {signOutUtil()}}> Sign Out </MenuItem>
      </Menu>
    </View>
  );
};

export default BurgerMenu