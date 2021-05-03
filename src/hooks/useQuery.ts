import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  const location = useLocation();
  return useRef(new URLSearchParams(location.search)).current;
};

export default useQuery;
