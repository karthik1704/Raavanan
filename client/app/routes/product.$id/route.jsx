import { Link, useLoaderData } from '@remix-run/react';

import {
  Button,
  Grid,
  Divider,
  Typography,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';

// import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
// import StoreIcon from '@mui/icons-material/Store';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';




import ImageGallery from 'react-image-gallery';

import imageGalleryStyles from  'react-image-gallery/styles/css/image-gallery.css';

const RootDiv = styled('div')(({ theme }) => ({
  margin: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    margin: '16px 0',
  },
}));

export const loader = async ()=>{
  return {
    product:{}
  }
}

export const links = ()=>([
  {rel:'stylesheet', href:imageGalleryStyles}
])

export default function Product() {
  const {product} = useLoaderData();
 
  return (
    <RootDiv>
      {product && (
        <div key={product.id}>
          <Grid container>
            <Grid
              item
              xs={12}
              md={6}
              lg={5}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <div>
                
                <ImageGallery
                  items={product.product_images}
                  thumbnailPosition={'left'}
                  showFullscreenButton={false}
                  showPlayButton={false}
                  autoPlay={false}
                  showNav={false}
                  style={{ maxHeight: '300px' }}
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} sx={{ p: '10px' }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {product.name}
              </Typography>
         
              <Divider />
           
              <>
                <Typography variant="subtitle1">
                  அதிகபட்ச விற்பனை விலை: ₹ <del>{product.mrp}</del>
                </Typography>
                <Typography variant="subtitle1">
                  தற்போதைய விலை: ₹ <b>{product.price}</b>
                </Typography>
                <Divider />
                <FormControl component="fieldset">
                  {product.price.length > 1 && (
                    <FormLabel component="legend" color="secondary">
                      அளவைத் தேர்ந்தெடுக்கவும் (அங்குலங்களில்)
                    </FormLabel>
                  )}

                  <RadioGroup
                    row
                    aria-label="position"
                    name="position"
                    defaultValue={product.price[0].types}
                  >
                    {product.price
                      .filter((price) => price.types !== null)
                      .map((price) => (
                        <FormControlLabel key={price.id}
                          value={price.types}
                          control={<Radio color="primary" />}
                          label={price.types}
                          labelPlacement="end"
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              </>

              <div>
                <Typography variant="body1">இருப்பில் உள்ளது</Typography>
                {/* <Button
                  sx={{
                    m: 1,
                    backgroundColor: green[500],
                  }}
                  color="secondary"
                  justifycontent="flex-end"
                  variant="contained"
                  startIcon={<AddShoppingCartIcon />}
                  onClick={(event) => {
                    handleAddItemtoCart(product.id);
                  }}
                >
                  கூடை
                </Button> */}
                <Button
                  variant="contained"
                  startIcon={<WhatsAppIcon />}
                  // className={classes.whatsappBtn}
                  component={Link}
                  to={{
                    pathname: `/${product.id}/waorder`,
                    
                  }}
                >
                  பொருளை வாங்க
                </Button>
                <br />
              </div>
              <Divider />
              <Typography variant="body2">
                {product.description}
              </Typography>
              <Divider />
              <Typography variant="h6">பொருள் விவரங்கள் </Typography>
              <Table size="small" aria-label="Product Detail table">
                <TableHead>
                  <TableRow>
                    <TableCell>தயாரிப்பு</TableCell>
                    <TableCell>{product.manufacturer}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>வியாபாரக் குறி</TableCell>

                    <TableCell>{product.brand}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>தகுதியான சாதனங்கள்</TableCell>
                    <TableCell>{product.supported_devices}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>எண்ணிக்கை </TableCell>

                    <TableCell>{product.quantity}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>மூலப்பொருள் </TableCell>
                    <TableCell>
                      {product.materials &&
                        product.materials.map((material) => (
                          <span key={material.id}>
                            {' '}
                            {material.material_name}{' '}
                          </span>
                        ))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>வகை </TableCell>
                    <TableCell>
                      {product.category && product.category.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>தோற்றம் </TableCell>
                    <TableCell>{product.origin}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Grid>
          </Grid>
        </div>
      )}
    </RootDiv>
  );
}

