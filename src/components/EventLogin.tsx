import { FC, useState, FormEvent } from 'react';
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

const ERROR_MESSAGES = {
  'auth/wrong-password':
    'Wrong Password. The password can be found on the photobooth.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  null: '',
};
export type SignInErrors = keyof typeof ERROR_MESSAGES;

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

interface EventLoginProps {
  eventId: string;
  eventName: string;
  defaultError: SignInErrors;
}

const EventLogin: FC<EventLoginProps> = ({
  eventId,
  eventName,
  defaultError,
}) => {
  const classes = useStyles();
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<SignInErrors>(defaultError);
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useAuth();

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (password) await signIn(eventId, password);
      else {
        setError('auth/wrong-password');
        setLoading(false);
      }
    } catch (err) {
      setError(err.code);
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Card className={classes.paper}>
        <Avatar className={classes.avatar}>
          <PhotoLibraryIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter {eventName} Password
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitForm}>
          <TextField
            disabled={loading}
            error={error !== 'null'}
            helperText={ERROR_MESSAGES[error]}
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
