import { Slide } from 'react-slideshow-image';

import CarouselImage1 from '../../asserts/images/banner1.jpg';
import CarouselImage2 from '../../asserts/images/banner2.jpg';
import CarouselImage3 from '../../asserts/images/banner3.jpg';
import 'react-slideshow-image/dist/styles.css';

const Carousel = () => {
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
