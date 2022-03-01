import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './context/PlanetsContext';

const Provider = ({ children }) => {
  const [planets, setPlanets] = useState([]);

  const [nameFilter, setNameFilter] = useState('');
  // const [nameFiltered, setNameFiltered] = useState([]);

  const [numberFilter, setNumberFilter] = useState([]);

  const [options, setOptions] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water']);

  const [filteredPlanets, setFilteredPlanets] = useState([]);

  const context = {
    planets,
    setPlanets,
    nameFilter,
    setNameFilter,
    filteredPlanets,
    setNumberFilter,
    options,
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

  useEffect(() => {
    console.log(numberFilter);
  }, [numberFilter]);

  // filtrando por valores numericos
  useEffect(() => {
    const { column, value, comparison } = numberFilter;
    const filtered = filteredPlanets.filter((planet) => {
      switch (comparison) {
      case 'maior que':
        return parseInt(planet[column], 10) > value;
      case 'menor que':
        return parseInt(planet[column], 10) < value;
      default:
        return planet[column] === value;
      }
    });
    setFilteredPlanets(filtered);
    setOptions(options.filter((option) => option !== column));
  }, [filteredPlanets, numberFilter, options]);

  return (
    <PlanetsContext.Provider value={ context }>
      { children }
    </PlanetsContext.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
