import { FC, useCallback, useState, FormEvent } from 'react';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useAuth } from '../hooks/useAuth';
import useAsync from '../hooks/useAsync';

interface EventLoginProps {
  eventId: string;
}
const ERROR_MESSAGES = {
  'auth/wrong-password': 'Wrong Password',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const EventLogin: FC<EventLoginProps> = ({ eventId }) => {
  const classes = useStyles();
  const [password, setPassword] = useState<string>('');
  const { signIn } = useAuth();

  const runSignIn = useCallback(() => signIn(eventId, password), [
    eventId,
    password,
    signIn,
  ]);
  const { loading, execute, error } = useAsync(runSignIn, false);

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    execute();
  };

  const errorCode = error?.code as keyof typeof ERROR_MESSAGES;

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PhotoLibraryIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter Event Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
            disabled={loading}
            error={!!error}
            helperText={ERROR_MESSAGES[errorCode] || ''}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            disabled={loading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {loading ? <CircularProgress color="primary" /> : 'View Photos'}
          </Button>
        </form>
      </Card>
    </Container>
  );
};

export default EventLogin;
