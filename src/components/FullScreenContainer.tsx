import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from './Container';

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

const FullScreenContainer: FC = ({ children }) => {
  const classes = useStyles();
  return <Container className={classes.root}>{children}</Container>;
};

export default FullScreenContainer;
