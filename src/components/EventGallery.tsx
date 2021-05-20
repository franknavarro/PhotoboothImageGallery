import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from './Container';
import clsx from 'clsx';
import { FC, useState } from 'react';
import ImageTile from './ImageTile';
import ImageViewer from './ImageViewer/ImageViewer';
import LazyLoad from 'react-lazyload';
import NoPhotos from './NoPhotos';
import Toolbar from './Toolbar';
import useImageLibrary from '../hooks/useImageLibrary';

interface EventGalleryProps {
  uid: string;
}

const useStyles = makeStyles((theme) => ({
  imageItem: {
    '&-wrapper': {
      flex: '50%',
      maxWidth: '50%',
      paddingBottom: '50%',
      listStyle: 'none',
      display: 'block',
      position: 'relative',
      [theme.breakpoints.up('sm')]: {
        flex: '25%',
        maxWidth: '25%',
        paddingBottom: '25%',
      },
      [theme.breakpoints.up('md')]: {
        flex: '20%',
        maxWidth: '20%',
        paddingBottom: '20%',
      },
    },
  },
  container: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(5)}px`,
    },
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: 0,
    padding: 0,
  },
  loadContainer: {
    display: 'flex',
    width: '100%',
    margin: `${theme.spacing(4)}px 0`,
    justifyContent: 'center',
    minHeight: theme.spacing(2),
  },
  hideLoad: {
    display: 'none',
  },
}));

const EventGallery: FC<EventGalleryProps> = ({ uid }) => {
  const classes = useStyles();
  const [showViewer, setShowViewer] = useState<boolean>(false);
  const {
    images,
    loadMoreRef,
    loadingImages,
    position,
    retry,
    setPosition,
  } = useImageLibrary(uid);

  if (!images.length) return <NoPhotos loading={loadingImages} retry={retry} />;

  return (
    <>
      <Container>
        <Toolbar />
        <ul className={classes.root}>
          {images.map((doc, index) => (
            <LazyLoad
              key={doc.id}
              classNamePrefix={classes.imageItem}
              offset={100}
              once
            >
              <ImageTile
                image={doc.data().thumbnail}
                onClick={() => {
                  setPosition(index);
                  setShowViewer(true);
                }}
              />
            </LazyLoad>
          ))}
        </ul>
        <div className={classes.loadContainer} ref={loadMoreRef}>
          <CircularProgress
            className={clsx(!loadingImages && classes.hideLoad)}
          />
        </div>
      </Container>
      <ImageViewer
        display={showViewer}
        images={images}
        onClose={() => setShowViewer(false)}
        position={position}
        setPosition={setPosition}
      />
    </>
  );
};

export default EventGallery;
