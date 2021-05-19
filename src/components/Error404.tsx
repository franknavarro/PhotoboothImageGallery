import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: theme.spacing(2),
    },
  },
  spacing: {},
}));

const Error404: FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h3" component="h1">
        Error 404.
      </Typography>
      <Typography variant="h5" component="h2">
        This page could not be found!
      </Typography>
      <Typography variant="h6" component="h3">
        If you are looking for an event check the photobooth for a link or QR
        code.
      </Typography>
      <Button
        color="primary"
        variant="outlined"
        size="large"
        component={Link}
        to="/"
      >
        Back to Homepage
      </Button>
    </Container>
  );
};

export default Error404;
