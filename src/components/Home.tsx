import Container from '@material-ui/core/Container';
import { FC } from 'react';
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

const Home: FC = () => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Typography variant="h4" component="h1">
        <strong>View your photobooth images online</strong>
      </Typography>
      <Typography variant="h6" component="body">
        Check the photobooth for a link or QR code to view your event pictures.
      </Typography>
    </Container>
  );
};

export default Home;
