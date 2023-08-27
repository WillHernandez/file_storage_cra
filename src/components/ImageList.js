import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
// import ModalImage from "react-modal-image";
import ModalImage from '@will2code/react-modal-image'
const imagePlaceholder = require('../static/image-placeholder-icon.png')

// edit aws/s3/buckets/permission/cors to allow host access - implement DL btn. Change before production
export default function MainImageListComponent ({ objects }) {
	return(
		<div className='objectsContainer' >
    	<Box sx={{height: "100vh", width: '100vw', overflowY: 'scroll', margin: 'auto', padding: "10px 40px", marginTop: "20px"}}>
      	<ImageList variant="masonry" cols={5} gap={15}>
        	{objects && objects.map((val, i) => (
						<ImageComponent key={i} val={val} />
					))}
      	</ImageList>
    	</Box>
		</div>
	)
}

const ImageComponent = ({ val }) => (
	<ModalImage small={val} medium={val} showRotate={true} showDelete={true}>
		<ImageListItem >
				<img className='listItemImg'
					src={`${val}?w=248&fit=crop&auto=format`}
					srcSet={val}
					alt={imagePlaceholder}
					loading="lazy"
				/>
		</ImageListItem>
	</ModalImage>
)