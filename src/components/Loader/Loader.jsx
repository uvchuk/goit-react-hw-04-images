import { Loading } from 'notiflix';
import { useEffect } from 'react';

export const Loader = () => {
  useEffect(() => {
    return () => {
      Loading.remove();
    };
  });
  return Loading.circle();
};
