import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FC } from 'react';
import FullScreenContainer from './FullScreenContainer';
import Typography from '@material-ui/core/Typography';

interface NoPhotosProps {
  loading: boolean;
  retry: () => void;
}

const NoPhotos: FC<NoPhotosProps> = ({ loading, retry }) => {
  return (
    <FullScreenContainer>
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
    </FullScreenContainer>
  );
};

export default NoPhotos;
