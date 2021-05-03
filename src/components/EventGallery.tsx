import { Container, makeStyles } from '@material-ui/core';
import { FC, useState } from 'react';
import useStorage from '../hooks/useStorage';
import ImageTile from './ImageTile';
import ImageViewer from './ImageViewer';
import LazyLoad from 'react-lazyload';

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
}));

const EventGallery: FC<EventGalleryProps> = ({ uid }) => {
  const classes = useStyles();
  const [largeIndex, setLargeIndex] = useState<number>(-1);
  const [files] = useStorage(uid);

  return (
    <>
      <Container maxWidth="lg" classes={{ root: classes.container }}>
        <ul className={classes.root}>
          {files.map((file, index) => (
            <LazyLoad
              key={file.name}
              classNamePrefix={classes.imageItem}
              offset={100}
              once
            >
              <ImageTile image={file} onClick={() => setLargeIndex(index)} />
            </LazyLoad>
          ))}
        </ul>
      </Container>
      <ImageViewer
        images={files}
        position={largeIndex}
        setPosition={setLargeIndex}
      />
    </>
  );
};

export default EventGallery;
