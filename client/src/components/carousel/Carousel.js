import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

import CarouselImage1 from '../../asserts/images/banner1.jpg';
import CarouselImage2 from '../../asserts/images/banner2.jpg';
import CarouselImage3 from '../../asserts/images/banner3.jpg';
// import banner1 from '../../asserts/images/raavanan logo png.png';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
    margin: theme.spacing(2),
    height: 340,

    [theme.breakpoints.down('sm')]: {
      height: 120,
    },
    [theme.breakpoints.up('sm')]: {
      height: 340,
    },
  },
  media: {
    height: '100%',
    width: '100%',
    padding: 0,
  },
  image:{
   
    // position:'absolute',
    
    width:'100%',
    // left:'50%',
    
  }
}));

const Carousel = () => {
  const classes = useStyles();
  const slideImages = [CarouselImage1,CarouselImage2,CarouselImage3 ]
  return (
    // <Card className={classes.root}>
    //   <img src={CarouselImage1} className={classes.media} alt="image1" />
    // </Card>
    
      <div className="slide-container">
        <Slide>
          {
          slideImages.map((image) => (

                        
            <div className="each-slide">
              {/* <div className={classes.media} style={{'height': '250px','width': '100%','backgroundSize': 'cover',
    'backgroundRepeat': 'no-repeat','background-size': '100% 220px','background-position': 'center center','backgroundImage': `url(${image})`}}> */}
                {/* <span>Slide 1</span> */}
              {/* </div> */}

              <div  style={{width:'100%'}}>
                <img className={classes.image}  alt="a" 
              srcSet={`${image} 1x, ${image} 2x`}
              src={image}
                />
                {/* <img className={classes.image} 
                src={image} ></img> */}
                {/* <img src={CarouselImage1}></img> */}

                </div>

            </div>
          ))
          } 
        
         
        </Slide>
      </div>
    
  );
};

export default Carousel;
