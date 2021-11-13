/* eslint-disable react/jsx-one-expression-per-line */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Grid from '@mui/material/Grid';

import InfiniteScroll from 'react-infinite-scroll-component';
import ripple from '../../asserts/ripple.gif';
import ReactGA from 'react-ga';

import { Helmet } from 'react-helmet';

import ProductList from '../../components/productList/ProductList';

import { useGetProductsQuery } from '../../features/product/productApi';

const Products = () => {
  const { category } = useParams();
  const [count, setCount] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();

  const [page, setPage] = useState(null);

  const { data: products, isLoading } = useGetProductsQuery({
    slug: category,
    page,
  });

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);

    setCount(0);
    setHasMore(true);
    setPage(null);
  }, [category]);

  const fetchMoreData = () => {
    if (products.next !== null) {
      console.log('if');
      console.log(products.next.slice(-1));
      setPage(products.next.slice(-1));
      setHasMore(true);
    } else {
      setPage(null);
      setHasMore(false);
    }
  };

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
          {products && (
            <InfiniteScroll
              dataLength={products?.results?.length}
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
                <ProductList products={products?.results} />
              </Grid>
            </InfiniteScroll>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Products;
