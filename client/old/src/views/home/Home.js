import { useEffect, Suspense, useState } from 'react';

// MUI
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

// RTK
import { useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../../features/product/productApi';
import { toggleLoader } from '../../features/loader/loaderSlice';

// Compoents
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';
import customAxios from '../../navigation/NavigationService';

import Confetti from 'react-confetti';
import greetings from '../../asserts/images/greetings.png';
import { Popup } from 'react-easy-popup';
import 'react-easy-popup/dist/react-easy-popup.min.css';
import './home.css';
// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(1),
//   },
//   fullWidth : {
//     maxWidth : '100%'
//   },
//   maxWidthLg : {
//     maxWidth : '100%'
//   }
// }));

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({ slug: null, page: null });
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  // const  Axios = useAxios()
  useEffect(() => {
    dispatch(toggleLoader(isLoading));
  }, [dispatch, isLoading]);

  const closegreeting = () => {
    console.log('greeting close');
    setVisible(false);
  };

  return (
    <Box sx={{ maxWidth: '100%' }}>
      {/* <Confetti
        width={window.innerWidth - 30}
        numberOfPieces={2000}
        recycle={false}
        tweenDuration={18000}
        onConfettiComplete={closegreeting}

        // height={1000}
      />
      <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        mask={true}
        maskClosable={true}
      >
        <div className="greet">
          <img
            src={greetings}
            srcSet={`${greetings} 1x, ${greetings} 2x`}
            alt="greet"
          />
        </div>
      </Popup> */}
      <div>
        <Carousel />
      </div>
      <Suspense fallback={'Loading...'}>
        <Grid container sx={{ mt: 1 }}>
          {data && <ProductList products={data?.results} />}
        </Grid>
      </Suspense>
    </Box>
  );
};

export default Home;
