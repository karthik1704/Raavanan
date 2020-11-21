import { useEffect } from 'react';

import useTopLoader from '../../hooks/useTopLoader';

const Contact = () => {
  const [onToggleTopLoader] = useTopLoader();

  useEffect(() => {
    onToggleTopLoader();
  }, []);

  return (
    <div>
      <p>I am Contact</p>
    </div>
  );
};

export default Contact;
