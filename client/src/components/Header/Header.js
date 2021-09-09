import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';

import { styled } from '@mui/material/styles';

const RootDiv = styled('div')(({ theme }) => ({
  flexGrow: 1,
  '& > svg': {
    margin: theme.spacing(2),
  },
}));

const HeaderTitle = styled('p')(({ theme }) => ({
  fontSize: 24,
  margin: 0,
  fontWeight: 'bold',
  paddingBottom: 10,
}));

const SubTitle = styled('p')(({ theme }) => ({
  margin: 0,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 20,
}));

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     '& > svg': {
//       margin: theme.spacing(2),
//     },
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: 'center',
//     color: 'white',
//     background: '#43a047',
//     marginTop: 10,
//     justifyContent: 'center',
//   },
//   Header_title: {
//     fontSize: 24,
//     margin: 0,
//     fontWeight: 'bold',
//     paddingBottom: 10,
//   },
//   Sub_title: {
//     margin: 0,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontSize: 20,
//   },

//   Home_Icon: {
//     color: 'white !important',
//   },
//   Home_Navigate: {
//     color: 'white !important',
//     textDecoration: 'none',
//   },
// }));

export default function Header({ title, subtitle }) {
  return (
    <RootDiv>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div>
            <Paper
              sx={{
                padding: 2,
                textAlign: 'center',
                color: 'white',
                background: '#43a047',
                marginTop: 10,
                justifyContent: 'center',
              }}
            >
              <HeaderTitle>{title}</HeaderTitle>
              <Link
                to="/"
                sx={{
                  color: 'white !important',
                  textDecoration: 'none',
                }}
              >
                <SubTitle>
                  <ArrowBackIcon
                    sx={{
                      color: 'white !important',
                    }}
                  />
                  {subtitle}
                </SubTitle>
              </Link>
            </Paper>
          </div>
        </Grid>
      </Grid>
    </RootDiv>
  );
}
