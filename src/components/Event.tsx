import CircularProgress from '@material-ui/core/CircularProgress';
import EventGallery from './EventGallery';
import EventLogin from './EventLogin';
import Error404 from './Error404';
import extractUsername from '../helpers/extractUsername';
import { firestore } from '../helpers/firebase';
import { FC, useEffect, useState } from 'react';
import FullScreenContainer from './FullScreenContainer';
import { SignInErrors } from './EventLogin';
import { useAuth } from '../hooks/useAuth';
import { useEventName } from '../hooks/useEventName';
import { useParams, useHistory, useLocation } from 'react-router';

interface EventParams {
  eventId: string;
}

const Event: FC = () => {
  const { eventId } = useParams<EventParams>();
  const { user, signIn } = useAuth();
  const [signInError, setSignInError] = useState<SignInErrors>('null');
  const { eventName, setEventName } = useEventName();
  const [loading, setLoading] = useState<boolean>(true);

  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const checkEvent = async () => {
      let eventName = '';
      let secondLoad = false;
      try {
        const eventDetails = (await firestore.events.doc(eventId).get()).data();
        if (eventDetails) {
          eventName = eventDetails.name;
          const queryParams = new URLSearchParams(location.search);
          const password = queryParams.get('p');
          if (!!eventName && !!password) {
            secondLoad = true;
            await signIn(eventId, password);
          }
        }
      } catch (error) {
        setSignInError(error.code);
      } finally {
        if (!secondLoad) {
          if (eventName) setEventName(eventName);
          setLoading(false);
        } else {
          history.replace(location.pathname);
        }
      }
    };
    checkEvent();
  }, [eventId, signIn, setEventName, history, location]);

  if (loading)
    return (
      <FullScreenContainer>
        <CircularProgress />
      </FullScreenContainer>
    );
  if (!eventName) return <Error404 />;
  if (
    !user ||
    (user && user.email && extractUsername(user.email) !== eventId)
  ) {
    return (
      <EventLogin
        eventId={eventId}
        eventName={eventName}
        defaultError={signInError}
      />
    );
  }

  return <EventGallery uid={user.uid} />;
};

export default Event;
