/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

import { useParams } from 'react-router-dom';

const Products = () => {
  const { category } = useParams();

  if (category !== 'phonecase') {
    return (
      <div>
        <h4>
          {' '}
          {category.toUpperCase()}
          Products Coming Soon
        </h4>
      </div>
    );
  }

  return <div> Products Page :{category}</div>;
};

export default Products;
