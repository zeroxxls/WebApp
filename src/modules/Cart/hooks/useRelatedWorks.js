import { useState, useEffect } from 'react';

export const useRelatedWorks = (allWorks) => {
  const [relatedWorks, setRelatedWorks] = useState([]);

  useEffect(() => {
    if (!allWorks || allWorks.length === 0) {
      setRelatedWorks([]);
      return;
    }

    const getRandomWorks = (arr, n) => {
      const shuffled = [...arr].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, n);
    };

    const numberOfRelatedWorks = Math.min(3, allWorks.length);
    const randomWorks = getRandomWorks(allWorks, numberOfRelatedWorks);
    setRelatedWorks(randomWorks);
  }, [allWorks]);

  return { relatedWorks };
};