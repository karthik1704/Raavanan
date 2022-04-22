import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  links: {
    color: '#fff',
    textDecoration: 'none',
  },
  grow: {
    flexGrow: 1,
  },
  dark: {
    background: '#131921',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,

    display: 'flex',
    flex: 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
      maxWidth: '50% !important',
    },
    [theme.breakpoints.down('sm')]: {
      // marginLeft: theme.spacing(3),
      width: 'auto',
      marginRight: 0,
      marginBottom: '20px',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    height: '40px',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '70%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
    minHeight: '40px !important',
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },

  centerToolbar: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      backgroundColor: '#232f3e',
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  centeroptionbar: {
    display: 'block',
    textAlign: 'center',

    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  rightToolbar: {
    // display: 'flex',
    width: '100%',
    flexWrap: 'wrap',
    justifyContent: 'flex-end',
  },
  logoutBtn: {
    boxShadow: 'none !important',
    padding: '10px !important',
    fontWeight: 400,
    color: 'black !important',
  },
  secMenu: {
    background: '#232f3e !important',
    fontSize: '12px !important',
  },
  secMenu1: {
    fontSize: '12px !important',
  },
  subMenu: {
    background: '#232f3e !important',
    fontSize: '12px !important',
    color: 'white',
    '&:hover': {
      backgroundColor: 'green !important',
    },
  },
  MenuPopup: {
    background: '#232f3e !important',
  },
}));
