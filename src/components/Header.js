import React, { useContext, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const { nameFilter, setNameFilter } = useContext(PlanetsContext);
  useEffect(() => {
    console.log(nameFilter);
  }, [nameFilter])
  return (
    <header>
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
    </header>
  );
}
