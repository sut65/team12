  
import { styled, useTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
//import background from "./image/R.jpg";
import { Box, Button, Container, Grid, Paper } from "@mui/material";
import * as React from "react";
import Carousel from "react-material-ui-carousel";

import background from "../Image/im11.jpg"

import im14 from "../Image/im14.jpg"
import im10 from "../Image/im10.jpg"
import im4 from "../Image/im4.jpg"
import im2 from "../Image/im2.jpg"
import im3 from "../Image/im3.jpg"
import im13 from "../Image/im13.jpg"
import im16 from "../Image/im16.png"
import im9 from "../Image/im9.png"
import { mt } from "date-fns/locale";

const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});



function Home() {
 
  function Item(props: any) {
    return (
         <img src={props.item.Image} width= "100%" height="595px"/>
      );
  }

  var Slider = [
    {
      Image: im4,
    },
    {
      Image: im2,
    },
    {
      Image: im3,
    },
    {
      Image: im14,
    },
    {
      Image: im16,
    },
  ];

  function ImageC() {
    return (
      <Carousel>
        {Slider.map((item, i) => (<Item key={i} item={item} />))}
      </Carousel>
      
    );
  }
  return (
  <div>
     <Grid>
      
      <div style={{ height: 800, width: "100%", marginTop: "10px" }}>
      
      <Card sx={{ maxWidth: 5000 }}>
      <Carousel>
        {Slider.map((item, i) => (<Item key={i} item={item} />))}
      </Carousel>
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          TEAM 12 Hospital
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Welcome to The Inpatienting we healing the World, ...                       
        Never gonna give you up Never gonna let you down Never gonna run around and desert you
        Never gonna make you cry Never gonna say goodbye Never gonna tell a lie and hurt you
        </Typography>
      </CardContent>
      {/* <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
    
    </div>
     </Grid >
     {}
  </div>

  
  );
}

export default Home;