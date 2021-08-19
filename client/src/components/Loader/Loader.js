import LinearProgress from '@material-ui/core/LinearProgress';
//import makeStyles from '@material-ui/styles/makeStyles';

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
