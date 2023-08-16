import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ModalImage from "react-modal-image";
const backendUrl = 'http://localhost:4000'

export default function MainImageListComponent () {
	const [images, setImages] = useState(null)

	useEffect(() => {
		axios(`${backendUrl}/api/bucket/getallobjects`)
		.then(res => setImages(res.data))
		.catch(e => console.log(e))
	}, [])
  return (
		<div className="main_cards_component">
			 <ImageListComponent images={images} />
		</div>
  );
}

const ImageListComponent = ({images}) => {
	return(
		<div className='imagesContainer' style={{background: 'black'}}>
    	<Box sx={{ height: '80vh', overflowY: 'scroll', margin: 'auto', background: "black" }}> {/* may have to tweak */}
      	<ImageList variant="masonry" cols={4} gap={10}>
        	{images && images.map((image, i) => (
						<div>
							<ModalImage small={image} medium={image}>
          			<ImageListItem key={i}>
            				<img
											style={{width: 300, height:300}}
              				src={`${image}?w=248&fit=crop&auto=format`}
              				srcSet={image}
											alt={image}
              				loading="lazy"
            				/>
          			</ImageListItem>
							</ModalImage>
						</div>
        	))}
      	</ImageList>
    	</Box>
		</div>
	)
}