import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Button from '@mui/material/Button'
import { useState } from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost:4000'

export default function MainCards() {
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

			{ showComponent && <CardComponent images={images} /> }
		</div>
  );
}

const CardComponent = ({images}) => {
	return(
		<div>
		{images && images.map((image, i) => {
			return(
					<Card key={i} sx={{ maxWidth: 345 }}>
						<CardActionArea>
							<CardMedia
								component="img"
								height="440"
								image={image}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
								 Sofi Lizard 
								</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				)
		})}
	</div>	
	)
}