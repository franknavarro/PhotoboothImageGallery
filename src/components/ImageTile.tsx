import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import { FC, MouseEventHandler } from 'react';
import SlideshowIcon from '@material-ui/icons/Slideshow';
import BrokenImageIcon from '@material-ui/icons/BrokenImage';
import useImageLoad from '../hooks/useImageLoad';

interface ImageTileProps {
  image: string;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const useStyles = makeStyles({
  fullSize: {
    width: '100%',
    height: '100%',
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '4rem',
    backgroundColor: '#ececec',
    color: '#999999',
  },
  hoverBox: {
    position: 'absolute',
    backgroundColor: 'rgb(0, 0, 0, 0.7)',
    transition: '.5s ease',
    top: 0,
    left: 0,
    opacity: 0,
    fontSize: 0,
    '&:hover': {
      cursor: 'pointer',
      opacity: 1,
      fontSize: '4rem',
    },
  },
  icon: { fill: 'white' },
  image: { objectFit: 'cover' },
  newBox: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  '@keyframes shine': {
    to: {
      backgroundPositionX: '-200%',
    },
  },
  '@keyframes grow': {
    from: {
      opacity: 0,
      transform: 'scale(0)',
    },
  },
  grow: { animation: '$grow 0.5s ease-in' },
  loading: {
    background:
      'linear-gradient(110deg, #ececec 20%, #f5f5f5 28%, #ececec 43%)',
    backgroundSize: '200% 100%',
    animation: '1.5s $shine linear infinite',
  },
});

const ImageTile: FC<ImageTileProps> = ({ image, onClick }) => {
  const classes = useStyles();
  const { loading, error, src } = useImageLoad(image);

  const showStatus = () => {
    if (loading)
      return <div className={clsx(classes.fullSize, classes.loading)} />;
    if (error) {
      return (
        <div className={clsx(classes.fullSize, classes.iconBox)}>
          <BrokenImageIcon fontSize="inherit" className={classes.grow} />
        </div>
      );
    }
    return (
      <div className={clsx(classes.fullSize, classes.grow)} onClick={onClick}>
        <img
          className={clsx(classes.fullSize, classes.image)}
          src={src}
          alt="photobooth capture"
        />
        <div
          className={clsx(classes.fullSize, classes.iconBox, classes.hoverBox)}
        >
          <SlideshowIcon fontSize="inherit" className={classes.icon} />
        </div>
      </div>
    );
  };

  return (
    <div className={clsx(classes.fullSize, classes.newBox)}>{showStatus()}</div>
  );
};

export default ImageTile;
