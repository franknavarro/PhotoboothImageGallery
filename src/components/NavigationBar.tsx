import AppBar from '@material-ui/core/AppBar';
import Container from './Container';
import { FC } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from './Toolbar';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

export const LOGO_SIZES = {
  normal: {
    height: 60,
    scroll: 50,
    spacing: 1,
  },
  small: {
    height: 50,
    scroll: 40,
    spacing: 1,
  },
};

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: 'white',
    zIndex: 1,
    transition: 'height 1s',
  },
  toolbar: {
    'header &': {
      minHeight: 0,
      padding: 0,
    },
  },
  toolbarContainer: {
    display: 'flex',
  },
  logo: {
    height: LOGO_SIZES.normal.height,
    width: 'auto',
    padding: theme.spacing(LOGO_SIZES.normal.spacing),
    transition: 'width 1s, height 1s',
    [theme.breakpoints.up('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
  },
  smallLogo: {
    height: LOGO_SIZES.normal.scroll,
    width: 'auto',
  },
}));
const NavigationBar: FC = () => {
  const classes = useStyles();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
    <AppBar
      position="fixed"
      className={classes.header}
      elevation={trigger ? 0 : 5}
    >
      <Toolbar className={classes.toolbar}>
        <Container className={classes.toolbarContainer}>
          <Link to="/">
            <img
              className={clsx(classes.logo, trigger && classes.smallLogo)}
              src={process.env.PUBLIC_URL + '/logo.svg'}
              alt="The One Photobooth Logo"
            />
          </Link>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
