import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';

type Context = {
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
};

const EventNameContext = createContext<Context>({
  eventName: '',
  setEventName: () => {},
});

export const useEventName = () => {
  return useContext(EventNameContext);
};

export const EventNameProvider: FC = ({ children }) => {
  const [eventName, setEventName] = useState<Context['eventName']>('');

  useEffect(() => {
    if (eventName) document.title = eventName;
  }, [eventName]);

  return (
    <EventNameContext.Provider value={{ eventName, setEventName }}>
      {children}
    </EventNameContext.Provider>
  );
};
