import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import PlanetsContext from './context/PlanetsContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState();
  const getPlanets = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    filteredPlanets,
  };
  useEffect(() => {
    const fetchData = async () => {
      const getPlanetas = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetas = await getPlanetas.json();
      const resolve = await planetas.results;
      setPlanets(resolve);
      setFilteredPlanets(resolve);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = planets.filter((planet) => (
      planet.name.toLowerCase().includes(nameFilter.toLowerCase())));
    setFilteredPlanets(filtered);
  }, [nameFilter, planets]);
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
