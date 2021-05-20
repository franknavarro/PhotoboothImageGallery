import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
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
}));

interface NoPhotosProps {
  loading: boolean;
  retry: () => void;
}

const NoPhotos: FC<NoPhotosProps> = ({ loading, retry }) => {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="h3" component="h1">
            No Photos Yet.
          </Typography>
          <Typography variant="h5" component="h2">
            Go have a great time and take some pictures on the photobooth!
          </Typography>
          <Button
            color="primary"
            variant="outlined"
            size="large"
            onClick={retry}
          >
            Refresh Page
          </Button>
        </>
      )}
    </Container>
  );
};

export default NoPhotos;
