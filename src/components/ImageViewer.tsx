import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ImageRef } from '../hooks/useStorage';
import useImageLoad from '../hooks/useImageLoad';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import { IconButton, ButtonGroup, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import SaveAltRoundedIcon from '@material-ui/icons/SaveAltRounded';

const useStyles = makeStyles((theme) => ({
  modal: {
    position: 'fixed',
    background: 'rgb(0,0,0,0.95)',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 1,
    visibility: 'visible',
    minWidth: '100vw',
    minHeight: '100vh',
    display: 'flex',
    color: 'white',
    fontSize: '4rem',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.5s, visibility 0.5s',
  },
  hideMouse: {
    cursor: 'none',
  },
  modalMobile: {
    minHeight: '-webkit-fill-available',
    minWidth: '-webkit-fill-available',
  },
  controls: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'opacity 0.5s, visibility 0.5s',
  },
  closer: {
    visibility: 'visible',
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    zIndex: 0,
  },
  closeButton: {
    position: 'absolute',
    top: theme.spacing(2),
    left: theme.spacing(2),
  },
  downloadButton: {
    position: 'absolute',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  hide: {
    visibility: 'hidden',
    opacity: 0,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    zIndex: 100,
  },
  buttons: {
    zIndex: 100,
    display: 'flex',
    position: 'absolute',
    bottom: theme.spacing(5),
    background: '#303030',
  },
  button: {
    zIndex: 100,
    color: 'white',
    '&:not(:last-child)': {
      borderRight: 0,
    },
  },
  '@keyframes fade': {
    from: { opacity: 0 },
  },
  fade: { animation: '$fade 0.5s ease-in' },
}));

interface ImageViewerProps {
  images: ImageRef[];
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
}

const ImageViewer: FC<ImageViewerProps> = ({
  images,
  position,
  setPosition,
}) => {
  const classes = useStyles();
  const [showControls, setShowControls] = useState<boolean>(true);
  const [play, setPlay] = useState<boolean>(false);

  const nextPosition = useMemo(
    () => (position < images.length - 1 ? position + 1 : 0),
    [position, images],
  );
  const prevPosition = useMemo(
    () => (position === 0 ? images.length : position) - 1,
    [position, images],
  );
  const currentImage = useMemo(() => {
    return images[position]?.parent?.parent?.child(
      `full/${images[position].name}`,
    );
  }, [images, position]);
  const nextImage = useMemo(() => {
    return images[nextPosition]?.parent?.parent?.child(
      `full/${images[nextPosition].name}`,
    );
  }, [images, nextPosition]);
  const prevImage = useMemo(() => {
    return images[prevPosition]?.parent?.parent?.child(
      `full/${images[prevPosition].name}`,
    );
  }, [images, prevPosition]);

  const { loading, error, src } = useImageLoad(currentImage);
  useImageLoad(nextImage);
  useImageLoad(prevImage);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (play) {
      timeout = setTimeout(() => setPosition(nextPosition), 5000);
    }
    return () => clearTimeout(timeout);
  }, [play, nextPosition, setPosition]);

  useEffect(() => {
    if (position === -1) setPlay(false);
  }, [position]);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const mouseMoving = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    };
    window.addEventListener('mousemove', mouseMoving);
    return () => {
      window.removeEventListener('mousemove', mouseMoving);
      clearTimeout(timeout);
    };
  }, []);

  const showImage = () => {
    if (loading || position === -1) return <CircularProgress />;
    if (error) return <BrokenImageIcon fontSize="inherit" />;
    return (
      <>
        <img
          className={clsx(classes.image, classes.fade)}
          src={src}
          alt="large slideshow"
        />
      </>
    );
  };

  return (
    <div
      className={clsx(classes.modal, classes.modalMobile, {
        [classes.hide]: position === -1,
        [classes.hideMouse]: !showControls,
      })}
    >
      {showImage()}
      <div
        className={clsx(classes.controls, { [classes.hide]: !showControls })}
      >
        <div
          className={clsx(classes.closer, { [classes.hide]: position === -1 })}
          onClick={() => setPosition(-1)}
        />
        <IconButton
          className={clsx(classes.button, classes.closeButton)}
          onClick={() => setPosition(-1)}
        >
          <CloseRoundedIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.button, classes.downloadButton)}
          href={src}
          download={currentImage?.name}
        >
          <SaveAltRoundedIcon />
        </IconButton>
        <ButtonGroup
          variant="contained"
          className={classes.buttons}
          classes={{ groupedContainedHorizontal: classes.button }}
        >
          <IconButton
            className={classes.button}
            onClick={() => setPosition(prevPosition)}
          >
            <NavigateBeforeRoundedIcon />
          </IconButton>
          <IconButton className={classes.button} onClick={() => setPlay(!play)}>
            {!play ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
          </IconButton>
          <IconButton
            className={classes.button}
            onClick={() => setPosition(nextPosition)}
          >
            <NavigateNextRoundedIcon />
          </IconButton>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ImageViewer;
