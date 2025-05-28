import { useEffect, useState } from 'react';

const useSlidesToShow = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1200) setSlidesToShow(4);
      else if (width >= 800) setSlidesToShow(3);
      else if (width >= 568) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return slidesToShow;
};

export default useSlidesToShow;
