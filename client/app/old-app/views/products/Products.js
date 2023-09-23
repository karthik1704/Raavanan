/* eslint-disable react/jsx-one-expression-per-line */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { Typography, Grid } from '@mui/material';

import InfiniteScroll from 'react-infinite-scroll-component';
import ripple from '../../asserts/ripple.gif';
import customAxios from '../../navigation/NavigationService';
import ReactGA from 'react-ga4';
import { API_URL } from '../../CONSTANTS';

import { Helmet } from 'react-helmet';

import { fetchProduct, resetProduct } from '../../data/actions/productActions';
import ProductList from '../../components/productList/ProductList';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(1),
//   },
// }));

const Products = () => {
  const { products } = useSelector((state) => state.products);
  const { category } = useParams();
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const filterUrl = `${API_URL}api/products/?category__slug=${category}`;
  const [nextUrl, setNextUrl] = useState(
    `${API_URL}api/product/?category__slug=${category}`
  );
  const url = `${API_URL}api/products/`;

  useEffect(() => {
    dispatch(resetProduct([]));
    // setFilterUrl(`${API_URL}api/product/?category__slug=${category}`);
    setCount(0);
    setHasMore(true);
    setNextUrl('');
  }, [dispatch, category]);

  const fetchMoreData = () => {
    // if(!nextUrl)
    //   return false
    customAxios.get(nextUrl).then((res) => {
      // setCount(res.data.count);
      if (res.data.next != null) {
        setNextUrl(res.data.next);
        setHasMore(true);
      } else {
        setNextUrl('');
        setHasMore(false);
      }

      dispatch(fetchProduct(res.data.results));
    });
  };

  useEffect(() => {
    
    ReactGA.pageview(window.location.pathname + window.location.search);
    customAxios.get(category === 'new' ? url : filterUrl).then((res) => {
      setCount(res.data.count);
      if (res.data.next != null) {
        setNextUrl(res.data.next);
        setHasMore(true);
      } else {
        setNextUrl('');
        setHasMore(false);
      }
      return dispatch(fetchProduct(res.data.results));
    });
  }, [dispatch, category, url, filterUrl]);

  return (
    <div>
      <Helmet>
        <title>இராவணன் அங்காடி | {category}</title>
      </Helmet>
      <Grid container sx={{ mt: 1 }}>
        <Grid item md={3} xl={3}></Grid>
        <Grid item xs={12} sm={12} md={9} xl={9}>
          {/* {products?.length !== 0 ? (
          <ProductList products={products} />
        ) : (
          <Typography>விரைவில்...</Typography>
        )} */}

          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div style={{ textAlign: 'center' }}>
                <img src={ripple} alt="loading" height="40px" width="40px" />
              </div>
            }
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {/* {this.state.items.map((i, index) => (
            <div key={index}>
              div - #{index}
            </div>
          ))} */}
            <Grid container sx={{ mt: 1 }}>
              <ProductList products={products} />
            </Grid>
          </InfiniteScroll>
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
