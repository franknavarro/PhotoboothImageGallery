import { FC, useCallback } from 'react';
import { useParams } from 'react-router';
import useAsync from '../hooks/useAsync';
import { useAuth } from '../hooks/useAuth';
import extractUsername from '../helpers/extractUsername';
import EventLogin from './EventLogin';
import useQuery from '../hooks/useQuery';
import EventGallery from './EventGallery';

interface EventParams {
  eventId: string;
}

const Event: FC = () => {
  const { eventId } = useParams<EventParams>();
  const { signIn, user } = useAuth();
  const queryParams = useQuery();

  const pageExists = useCallback(async () => {
    let exists = true;
    try {
      let username;
      let password = queryParams.get('p');
      if (user && user.email) {
        username = extractUsername(user.email);
      }
      if (username !== eventId) {
        await signIn(eventId, password || 'p');
      }
    } catch (error) {
      if (
        error.code === 'auth/invalid-email' ||
        error.code === 'auth/user-disabled' ||
        error.code === 'auth/user-not-found'
      ) {
        exists = false;
      }
    } finally {
      return exists;
    }
  }, [eventId, signIn, user, queryParams]);
  const { loading, value } = useAsync<boolean>(pageExists);

  if (loading) return <></>;
  if (!value) return <div>Event Not Found</div>;
  if (
    !user ||
    (user && user.email && extractUsername(user.email) !== eventId)
  ) {
    return <EventLogin eventId={eventId} />;
  }

  return <EventGallery uid={user.uid} />;
};

export default Event;
