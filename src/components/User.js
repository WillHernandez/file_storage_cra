import FileInput from './FileInput'
import BurgerMenu from './BurgerMenu';
import MainImageListComponent from './ImageList';

// import MainCards from './MainCards'; // alternate card files. larger. list component has a nice layout

const User = ({user}) => {
	return(
		<div>
			<BurgerMenu user={user}/>
			<FileInput />
			<MainImageListComponent />
		</div>
	)
}

export default User