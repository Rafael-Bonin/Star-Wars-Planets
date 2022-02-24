import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Table() {
  const { planets } = useContext(PlanetsContext);
  const [nameFilter, setNameFilter] = useState('');
  console.log(nameFilter);
  return (
    <div className="field">
      <label htmlFor="name-input" className="label">
        Filter By Name
        <input
          data-testid="name-filter"
          className="input is-info is-medium"
          value={ nameFilter }
          type="text"
          id="name-input"
          onChange={ ({ target }) => setNameFilter(target.value) }
        />
      </label>
      <table className="table is-bordered">
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
        { planets.length === 0 ? <p>loading</p> : planets.filter((planet) => (
          planet.name.toLowerCase().includes(nameFilter.toLowerCase())))
          .map((planet) => (
            <tr key={ planet.name }>
              <td>{ planet.name }</td>
              <td>{ planet.rotation_period }</td>
              <td>{ planet.orbital_period }</td>
              <td>{ planet.diameter }</td>
              <td>{ planet.climate }</td>
              <td>{ planet.gravity }</td>
              <td>{ planet.terrain }</td>
              <td>{ planet.surface_water }</td>
              <td>{ planet.population }</td>
              <td>{ planet.films }</td>
              <td>{ planet.created }</td>
              <td>{ planet.edited }</td>
              <td>{ planet.url }</td>
            </tr>
          )) }
      </table>
    </div>
  );
}
