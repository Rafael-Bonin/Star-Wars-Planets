import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import PlanetsContext from './context/PlanetsContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const getPlanets = {
    planets,
    setPlanets,
  };
  useEffect(() => {
    const fetchData = async () => {
      const getPlanetas = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetas = await getPlanetas.json();
      const resolve = await planetas.results;
      setPlanets(resolve);
    };
    fetchData();
  }, []);
  return (
    <PlanetsContext.Provider value={ getPlanets }>
      { children }
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Provider;
