import { useLoaderData } from '@remix-run/react';
import { styled } from '@mui/material/styles';

import CarouselImage1 from '~/assets/images/banner1.jpg';
import CarouselImage2 from '~/assets/images/banner2.jpg';
import CarouselImage3 from '~/assets/images/banner3.jpg';

import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const StyledImg = styled('img')({
  width: '100%',
});

const Carousel = () => {
  const { banner } = useLoaderData();
  const slideImages = [CarouselImage1, CarouselImage2, CarouselImage3];
  return (
    <div className="slide-container">
      <Slide>
        {banner &&
          banner.map((b, idx) => (
            <div className="each-slide" key={b.id}>
              <div style={{ width: '100%' }}>
                <StyledImg
                  alt={b.title}
                  srcSet={`${b.image} 1x, ${b.image} 2x`}
                  src={b.image}
                />
              </div>
            </div>
          ))}
      </Slide>
    </div>
  );
};

export default Carousel;
