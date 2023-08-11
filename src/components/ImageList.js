import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Button from '@mui/material/Button'
const backendUrl = 'http://localhost:4000'

export default function MainImageListComponent () {
	const [images, setImages] = useState(null)
	const [showComponent, setShowComponent] = useState(false);

	const fetchData = async () => {
		try {
			const res = await axios(`${backendUrl}/api/bucket/getallobjects`)
			setImages(res.data)
		} catch(e) {
			console.log({error: e});
		}
	}

  return (
		<div className="main_cards_component">
			<Button style={{backgroundColor:'#047D95'}} className='submitBtn' 
				onClick={() => {fetchData(); setShowComponent(!showComponent) }} 
				variant="contained" size="large">
				{showComponent ? "Hide Files" : "Show Files"}
			</Button>

			{ showComponent && <ImageListComponent images={images} /> }
		</div>
  );
}

// https://mui.com/material-ui/react-image-list/
const ImageListComponent = ({images}) => {
	return(
		<div>
    	<Box sx={{ width: "90vw", height: '70vh', overflowY: 'scroll', margin: 'auto', background: "black" }}> {/* may have to tweak */}
      	<ImageList variant="masonry" cols={3} gap={8}>
        	{images && images.map((image, i) => (
          	<ImageListItem key={i}>
            	<img
              	src={`${image}?w=248&fit=crop&auto=format`}
              	srcSet={image}
								alt={image}
              	loading="lazy"
            	/>
          	</ImageListItem>
        	))}
      	</ImageList>
    	</Box>
		</div>
	)
}