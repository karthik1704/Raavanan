import LinearProgress from '@mui/material/LinearProgress';
//import makeStyles from '@mui/styles/makeStyles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     zIndex: 1000,
//     //position: 'fixed',
//   },
// }));

const Loader = () => {
  return (
    <LinearProgress
      sx={{
        zIndex: 1000,
      }}
      color="secondary"
    />
  );
};

export default Loader;
