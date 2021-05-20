import clsx from 'clsx';
import { FC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MaterialContainer from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  container: {
    padding: 0,
    [theme.breakpoints.up('sm')]: {
      padding: `0 ${theme.spacing(5)}px`,
    },
  },
}));

interface ContainerProps {
  className?: string;
}

const Container: FC<ContainerProps> = ({ children, className }) => {
  const classes = useStyles();
  return (
    <MaterialContainer
      maxWidth="lg"
      classes={{ root: clsx(classes.container, className) }}
    >
      {children ? children : <></>}
    </MaterialContainer>
  );
};
export default Container;
