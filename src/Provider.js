import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './context/PlanetsContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [numberFilter, setNumberFilter] = useState({ column: '',
    comparison: '',
    value: '' });
  const getPlanets = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    filteredPlanets,
    setNumberFilter,
  };

  // fazendo fetch e colocando valor de setPlanets e setFilteredPlanets
  useEffect(() => {
    const fetchData = async () => {
      const getPlanetas = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const planetas = await getPlanetas.json();
      const resolve = await planetas.results;
      setFilteredPlanets(resolve);
      setPlanets(resolve);
    };
    fetchData();
  }, []);

  // filtrando por nomes
  useEffect(() => {
    const filtered = planets.filter((planet) => (
      planet.name.toLowerCase().includes(nameFilter.toLowerCase())));
    setFilteredPlanets(filtered);
  }, [nameFilter, planets]);

  // filtrando por valores numericos
  useEffect(() => {
    const { column, value, comparison } = numberFilter;
    const filtered = filteredPlanets.filter((planet) => {
      if (column !== '' && value !== '' && comparison !== '') {
        if (comparison === 'maior que') {
          return parseInt(planet[column], 10) > value;
        } if (comparison === 'menor que') {
          return parseInt(planet[column], 10) < value;
        }
        return planet[column] === value;
      }
      return planet;
    });
    setFilteredPlanets(filtered);
  }, [numberFilter]);
  return (
    <PlanetsContext.Provider value={ getPlanets }>
      { children }
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Provider;
