import clsx from 'clsx';
import { FC } from 'react';
import { LOGO_SIZES } from './NavigationBar';
import { makeStyles } from '@material-ui/core/styles';
import MaterialToolbar from '@material-ui/core/Toolbar';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: LOGO_SIZES.normal.height,
  },
}));

interface ToolbarProps {
  className?: string;
}

const Toolbar: FC<ToolbarProps> = ({ children, className }) => {
  const classes = useStyles();
  return (
    <MaterialToolbar className={clsx(classes.toolbar, className)}>
      {children}
    </MaterialToolbar>
  );
};
export default Toolbar;
