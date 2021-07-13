import { Carousel } from 'react-responsive-carousel';
import clsx from 'clsx';
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react';
import { ImageDocs } from '../../helpers/firebase';
import { makeStyles } from '@material-ui/core/styles';

import 'react-responsive-carousel/lib/styles/carousel.min.css';
import ViewerControls from './ViewerControls';
import CarouselImage from './Image';

const useStyles = makeStyles(() => ({
  modal: {
    zIndex: 1000,
    position: 'fixed',
    background: 'rgb(0,0,0)',
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
  modalMobile: {
    minHeight: '-webkit-fill-available',
    minWidth: '-webkit-fill-available',
  },
  hide: {
    visibility: 'hidden',
    opacity: 0,
  },
  hideMouse: {
    cursor: 'none',
  },
  slider: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
  },
}));

interface ImageViewerProps {
  display: boolean;
  images: ImageDocs;
  onClose: () => void;
  position: number;
  setPosition: Dispatch<SetStateAction<number>>;
}

const ImageViewer: FC<ImageViewerProps> = ({
  display,
  images,
  onClose,
  position,
  setPosition,
}) => {
  const classes = useStyles();
  const [play, setPlay] = useState<boolean>(false);
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
    if (play) {
      window.addEventListener('mousemove', mouseMoving);
    } else {
      setShowControls(true);
    }
    return () => {
      window.removeEventListener('mousemove', mouseMoving);
      clearTimeout(timeout);
    };
  }, [play]);

  return (
    <div
      className={clsx(
        classes.modal,
        classes.modalMobile,
        !display && classes.hide,
        !showControls && classes.hideMouse,
      )}
    >
      <Carousel
        autoPlay={play}
        className={classes.slider}
        infiniteLoop
        onChange={(pos) => {
          if (position !== pos) {
            setPosition(pos);
          }
        }}
        selectedItem={position}
        showArrows={false}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        stopOnHover={false}
        swipeable={false}
        emulateTouch={false}
        interval={5000}
        useKeyboardArrows
      >
        {images.map((doc, index) => (
          <CarouselImage
            key={`${doc.id}-full`}
            src={doc.data().full}
            display={
              index === position ||
              index === position - 1 ||
              index === position + 1 ||
              (position === 0 && index === images.length - 1) ||
              (position === images.length - 1 && index === 0)
            }
          />
        ))}
      </Carousel>
      <ViewerControls
        display={showControls}
        images={images}
        onClose={() => {
          onClose();
          setPlay(false);
        }}
        play={play}
        position={position}
        setPlay={setPlay}
        setPosition={setPosition}
      />
    </div>
  );
};

export default ImageViewer;
