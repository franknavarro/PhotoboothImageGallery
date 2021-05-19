import ButtonGroup from '@material-ui/core/ButtonGroup';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import clsx from 'clsx';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { ImageDocs } from '../../helpers/firebase';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeRoundedIcon from '@material-ui/icons/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@material-ui/icons/NavigateNextRounded';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import PauseRoundedIcon from '@material-ui/icons/PauseRounded';
import ShareButton from './ShareButton';

const useStyles = makeStyles((theme) => ({
  hideMouse: {
    cursor: 'none',
  },
  controls: {
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

interface ViewerControlsProps {
  images: ImageDocs;
  onClose: () => void;
  play: boolean;
  position: number;
  setPlay: Dispatch<SetStateAction<boolean>>;
  setPosition: Dispatch<SetStateAction<number>>;
}

const ViewerControls: FC<ViewerControlsProps> = ({
  images,
  onClose,
  play,
  position,
  setPlay,
  setPosition,
}) => {
  const classes = useStyles();

  const [showControls, setShowControls] = useState<boolean>(true);
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

  const hideCSS = clsx(classes.controls, !showControls && classes.hide);

  return (
    <>
      <IconButton
        className={clsx(classes.button, classes.closeButton, hideCSS)}
        onClick={onClose}
      >
        <CloseRoundedIcon />
      </IconButton>
      <ShareButton
        link={images.length ? images[position].data().full : ''}
        className={clsx(classes.button, classes.downloadButton, hideCSS)}
      />
      <ButtonGroup
        variant="contained"
        className={clsx(classes.buttons, hideCSS)}
        classes={{ groupedContainedHorizontal: classes.button }}
      >
        <IconButton
          className={classes.button}
          onClick={() =>
            setPosition((prev) => (prev === 0 ? images.length - 1 : prev - 1))
          }
        >
          <NavigateBeforeRoundedIcon />
        </IconButton>
        <IconButton className={classes.button} onClick={() => setPlay(!play)}>
          {!play ? <PlayArrowRoundedIcon /> : <PauseRoundedIcon />}
        </IconButton>
        <IconButton
          className={classes.button}
          onClick={() =>
            setPosition((prev) => (prev === images.length - 1 ? 0 : prev + 1))
          }
        >
          <NavigateNextRoundedIcon />
        </IconButton>
      </ButtonGroup>
    </>
  );
};

export default ViewerControls;
