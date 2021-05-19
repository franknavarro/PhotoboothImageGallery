import { FC, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  image: {
    '.carousel .slide &': {
      maxHeight: '100vh',
      maxWidth: '100vw',
      objectFit: 'contain',
      pointerEvents: 'auto',
    },
  },
}));

interface CarouselImageProps {
  display: boolean;
  src: string;
}

const CarouselImage: FC<CarouselImageProps> = ({ display, src }) => {
  const classes = useStyles();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    if (display && !show) {
      setShow(true);
    }
  }, [display, show]);

  if (!show) return <div></div>;
  return <img className={classes.image} src={src} alt="" />;
};

export default CarouselImage;
