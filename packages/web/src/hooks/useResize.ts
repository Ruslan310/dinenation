import { useMediaQuery } from 'react-responsive';

export const useResize = () => {
  const isScreenSm = useMediaQuery({ query: '(max-width: 600px)' });
  const isScreenLg = useMediaQuery({ query: '(max-width: 800px)' });

  return {
    isScreenSm,
    isScreenLg
  };
};

