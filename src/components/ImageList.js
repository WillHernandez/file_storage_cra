import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ModalImage from "react-modal-image";
const backendUrl = 'http://localhost:4000'
const imagePlaceholder = require('../static/image-placeholder-icon.png')

export default function MainImageListComponent () {
	const [images, setImages] = useState(null)

	useEffect(() => {
		axios(`${backendUrl}/api/bucket/getallobjects`)
		.then(res => setImages(res.data))
		.catch(e => console.log(e))
	}, [])
	
	return(
		<div className='imagesContainer' style={{background: 'black'}}>
    	<Box sx={{ height: '90vh', overflowY: 'scroll', margin: 'auto', background: "black" }}>
      	<ImageList variant="masonry" cols={4} gap={10}>
        	{images && images.map((image, i) => (
						// edit aws/s3/buckets/permission/cors to allow host access - implement DL btn. Change before production
						<ModalImage key={i} small={image} medium={image} showRotate={true}>
          			<ImageListItem >
            				<img
											style={{width: 300, height:300}}
              				src={`${image}?w=248&fit=crop&auto=format`}
              				srcSet={image}
											alt={imagePlaceholder}
              				loading="lazy"
            				/>
          			</ImageListItem>
						</ModalImage>
        	))}
      	</ImageList>
    	</Box>
		</div>
	)
}