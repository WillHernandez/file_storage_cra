import { View, Menu, MenuItem, Divider } from '@aws-amplify/ui-react';
import signOutUtil from '../utils/signOut';

const BurgerMenu = ({user}) => {
  return (
  	<View width="4rem">
    	<Menu>
        <MenuItem isDisabled > {user} </MenuItem>
        <MenuItem onClick={() => {signOutUtil()}}> Sign Out </MenuItem>
        <MenuItem onClick={() => alert('Download')}> Download </MenuItem>
        <Divider />
        <MenuItem isDisabled onClick={() => alert('Delete')}> Delete </MenuItem>
      </Menu>
    </View>
  );
};

export default BurgerMenu