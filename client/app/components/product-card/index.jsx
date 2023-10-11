import {
  Button,
  Box,
  Badge,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Grid,
  Paper,
  Typography,
  Skeleton,
} from '@mui/material';

import { Link } from '@remix-run/react';

const ProductCard = ({ product }) => {
  return (
    <Box
      sx={{
        ml:2,
        display: 'grid',
        gridTemplateColumns: { md: '1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr' },
        gap: 2,
      }}
    >
      <Paper  sx={{
        borderRadius: 3,}}
       
        elevation={0}
      >
        {product?.image || product?.product_image ? (
          <CardMedia
            sx={{
              aspectRatio: 'unset',
              maxWidth: '150px',
              borderRadius: 2,
              overflow: 'hidden',
            }}
            component="img"
            alt={product.title}
            height="200"
            image={product?.image ? product.image : product?.product_image}
          />
        ) : (
          <Skeleton
            variant="rectangular"
            width={150}
            height={200}
            sx={{ overflow:'hidden',  borderRadius: 3,}}
          />
        )}
      <Typography variant="body1">HI</Typography>
      </Paper>
    </Box>
  );
};

export default ProductCard;

/* */

//   {product.price && product.discount !== '0' && (
//     <Badge
//       anchorOrigin={{
//         vertical: 'top',
//         horizontal: 'right',
//       }}
//       color="primary"
//       overlap="circular"
//       badgeContent={`${product?.discount_percentage}%`}
//       variant="standard"
//       sx={{
//         borderRadius: '50%',
//         left: '6%',
//         display: 'contents',
//       }}
//     ></Badge>
//   )}
