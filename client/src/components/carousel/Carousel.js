import { Slide } from 'react-slideshow-image';

import { makeStyles } from '@material-ui/core/styles';

import CarouselImage1 from '../../asserts/images/banner1.jpg';
import CarouselImage2 from '../../asserts/images/banner2.jpg';
import CarouselImage3 from '../../asserts/images/banner3.jpg';

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
  const slideImages = [CarouselImage1, CarouselImage2, CarouselImage3];
  return (

    <div className="slide-container">
      <Slide>
        {slideImages.map((image, idx) => (
          <div className="each-slide" key={idx}>
            <div
              style={{
                backgroundImage: `url(${image})`,
                height: '260px',
                width: '100%',
                backgroundSize: '100% 220px',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            ></div>
          </div>
        ))}
      </Slide>
    </div>

  );
};

export default Carousel;
