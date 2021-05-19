import { FC, useCallback, useState } from 'react';
import { useParams } from 'react-router';
import useAsync from '../hooks/useAsync';
import { useAuth } from '../hooks/useAuth';
import extractUsername from '../helpers/extractUsername';
import EventLogin from './EventLogin';
import EventGallery from './EventGallery';
import { firestore } from '../helpers/firebase';
import useQuery from '../hooks/useQuery';
import { SignInErrors } from './EventLogin';

interface EventParams {
  eventId: string;
}

const Event: FC = () => {
  const { eventId } = useParams<EventParams>();
  const { user, signIn } = useAuth();
  const [signInError, setSignInError] = useState<SignInErrors>('null');
  const queryParams = useQuery();

  const pageExists = useCallback(async () => {
    let eventName = '';
    try {
      const eventDetails = (await firestore.events.doc(eventId).get()).data();
      if (eventDetails) {
        eventName = eventDetails.name;
        const password = queryParams.get('p');
        if (!!eventName && !!password) {
          await signIn(eventId, password);
        }
      }
    } catch (error) {
      setSignInError(error.code);
    } finally {
      return eventName;
    }
  }, [eventId, queryParams, signIn]);
  const { loading, value: eventName } = useAsync<string>(pageExists);

  if (loading) return <></>;
  if (!eventName) return <div>Event Not Found</div>;
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
