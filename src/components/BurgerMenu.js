import { View, Menu, MenuItem, Divider } from '@aws-amplify/ui-react';
import signOutUtil from '../utils/signOut';

const BurgerMenu = () => {
  const user = localStorage.getItem('username')
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