/* eslint-disable react/jsx-one-expression-per-line */
import { useParams } from 'react-router-dom';
import { useSelector }  from 'react-redux';

import ProductList from '../../components/productList/ProductList'
const Products = () => {
  const { products } = useSelector((state) => state.products);
  const { category } = useParams();

 

  return <div> 
    <ProductList  products={products}  />
  </div>;
};

export default Products;
