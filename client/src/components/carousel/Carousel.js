import { styled } from '@mui/material/styles';

import CarouselImage1 from '../../asserts/images/banner1.jpg';
import CarouselImage2 from '../../asserts/images/banner2.jpg';
import CarouselImage3 from '../../asserts/images/banner3.jpg';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const StyledImg = styled('img')({
  width: '100%',
});

const Carousel = () => {
  const slideImages = [CarouselImage1, CarouselImage2, CarouselImage3];
  return (
    <div className="slide-container">
      <Slide>
        {slideImages.map((image, idx) => (
          <div className="each-slide" key={idx}>
            {/* <div className={classes.media} style={{'height': '250px','width': '100%','backgroundSize': 'cover',
    'backgroundRepeat': 'no-repeat','background-size': '100% 220px','background-position': 'center center','backgroundImage': `url(${image})`}}> */}
            {/* <span>Slide 1</span> */}
            {/* </div> */}

            <div style={{ width: '100%' }}>
              <StyledImg
                alt="a"
                srcSet={`${image} 1x, ${image} 2x`}
                src={image}
              />
              {/* <img className={classes.image} 
                src={image} ></img> */}
              {/* <img src={CarouselImage1}></img> */}
            </div>
          </div>
        ))}
      </Slide>
    </div>
  );
};

export default Carousel;
