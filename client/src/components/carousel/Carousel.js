import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

import CarouselImage1 from '../../asserts/images/3.jpg';
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
}));

const Carousel = () => {
  const classes = useStyles();
  const slideImages = [CarouselImage1]
  return (
    // <Card className={classes.root}>
    //   <img src={CarouselImage1} className={classes.media} alt="image1" />
    // </Card>
    
      <div className="slide-container">
        <Slide>
          {
          slideImages.map((image) => (

                        
            <div className="each-slide">
              <div className={classes.media} style={{'height': '200px','width': '100%','backgroundSize': 'cover',
    'backgroundRepeat': 'no-repeat','backgroundImage': `url(${image})`}}>
                {/* <span>Slide 1</span> */}
              </div>
            </div>
          ))
          }
        
         
        </Slide>
      </div>
    
  );
};

export default Carousel;
