import Card from '@material-ui/core/Card';

import { makeStyles } from '@material-ui/core/styles';

import CarouselImage1 from '../../asserts/images/1.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100vw',
    margin: theme.spacing(2),
    height: 340,

    [theme.breakpoints.down('sm')]: {
      height: 120,
    },
    [theme.breakpoints.up('sm')]: {
      height: 340,
    },
  },
  media: {
    height: '100%',
    width: '100%',
    padding: 0,
  },
}));

const Carousel = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <img src={CarouselImage1} className={classes.media} alt="image1" />
    </Card>
  );
};

export default Carousel;
