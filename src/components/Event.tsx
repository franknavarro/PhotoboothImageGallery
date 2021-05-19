import EventGallery from './EventGallery';
import EventLogin from './EventLogin';
import Error404 from './Error404';
import extractUsername from '../helpers/extractUsername';
import { firestore } from '../helpers/firebase';
import { FC, useEffect, useState } from 'react';
import { SignInErrors } from './EventLogin';
import { useAuth } from '../hooks/useAuth';
import { useEventName } from '../hooks/useEventName';
import { useParams } from 'react-router';
import useQuery from '../hooks/useQuery';

interface EventParams {
  eventId: string;
}

const Event: FC = () => {
  const { eventId } = useParams<EventParams>();
  const { user, signIn } = useAuth();
  const [signInError, setSignInError] = useState<SignInErrors>('null');
  const { eventName, setEventName } = useEventName();
  const [loading, setLoading] = useState<boolean>(true);
  const queryParams = useQuery();

  useEffect(() => {
    const checkEvent = async () => {
      let eventName = '';
      setLoading(true);
      try {
        const eventDetails = (await firestore.events.doc(eventId).get()).data();
        if (eventDetails) {
          eventName = eventDetails.name;
          const password = queryParams.get('p');
          if (!!eventName && !!password) {
            await signIn(eventId, password);
          }
        }
        setEventName(eventName);
      } catch (error) {
        setSignInError(error.code);
      } finally {
        setLoading(false);
      }
    };
    checkEvent();
  }, [eventId, queryParams, signIn, setEventName]);

  if (loading) return <></>;
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
