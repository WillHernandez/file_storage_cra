import FileInput from './FileInput'
import BurgerMenu from './BurgerMenu';
import MainImageListComponent from './ImageList';

const User = ({user}) => {
	return(
		<>
			<BurgerMenu user={user}/>
			<FileInput />
			<MainImageListComponent />
		</>
	)
}

export default User