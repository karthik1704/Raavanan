import { useLoaderData } from '@remix-run/react';
import { styled } from '@mui/material/styles';



import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

const StyledImg = styled('img')({
  width: '100%',
});

const Carousel = () => {
  const { banner } = useLoaderData();
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
