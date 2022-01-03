import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import customAxios from '../../navigation/NavigationService';
// import customAxios from '../../navigation/NavigationService';

import { useDispatch, useSelector } from 'react-redux';

import { API_URL } from '../../CONSTANTS';

import { fetchProduct, resetProduct } from '../../data/actions/productActions';
import Confetti from 'react-confetti'
import useTopLoader from '../../hooks/useTopLoader';
import Carousel from '../../components/carousel/Carousel';
import ProductList from '../../components/productList/ProductList';
import greetings from '../../asserts/images/greetings.png';
import { Popup } from 'react-easy-popup';
import 'react-easy-popup/dist/react-easy-popup.min.css';
import './home.css'
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
  const { products } = useSelector((state) => state.products);
  const [, onToggleTopLoader] = useTopLoader();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  // const  Axios = useAxios()
  useEffect(() => {
    dispatch(resetProduct([]));
    customAxios.get(`${API_URL}api/product`).then((res) => {
      // onToggleTopLoader(false);
      return dispatch(fetchProduct(res.data.results));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const closegreeting = () =>{
    console.log("greeting close")
    setVisible(false)

  }

  return (
    <Box sx={{ maxWidth: '100%' }}>
      <Confetti
      width={window.innerWidth - 30}
      numberOfPieces = {2000}
      recycle = {false}
      tweenDuration = {18000}
      onConfettiComplete	={closegreeting}
      
      // height={1000}
    />
    <Popup  visible={visible} onClose={() => setVisible(false)}
    mask = {true} maskClosable = {true}>
       
        <div className="greet">
          <img src={greetings} />
        </div>
      </Popup>
      <div>
        <Carousel />
      </div>
      <Grid container sx={{ mt: 1 }}>
        <ProductList products={products} />
      </Grid>
    </Box>
  );
};

export default Home;
