import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom'

  
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > svg': {
        margin: theme.spacing(2),
      },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'white',
    background: '#43a047',
    marginTop: 10,
    justifyContent: 'center',
  },
  Header_title: {
    fontSize: 24,
    margin: 0,
    fontWeight: 'bold',
    paddingBottom:10
  },
  Sub_title:
  {
      margin: 0,
      display: "flex",
      justifyContent:'center',
      alignItems:'center',
      fontSize:20
  },
  
  Home_Icon:
  {
      color:'white !important',
 
  },
  Home_Navigate:
  {
    color:'white !important',
    textDecoration:'none'
  }
}));

export default function Header({ title, subtitle }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            <Paper className={classes.paper}>
              <p className={classes.Header_title}>{title}</p>
              <Link to="/" className={classes.Home_Navigate}>
              <p className={classes.Sub_title}><ArrowBackIcon className={classes.Home_Icon} />{subtitle}</p>

              </Link>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
