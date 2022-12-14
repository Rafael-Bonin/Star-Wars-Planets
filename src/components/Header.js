import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

export default function Header() {
  const { nameFilter, setNameFilter, setNumberFilter,
    options } = useContext(PlanetsContext);
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);
  return (
    <header className="is-flex is-justify-content-center is-align-items-center">
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
      <label htmlFor="number-filter" className="label">
        Column Filter
        <select
          id="numbem-filter"
          name="number-filter"
          data-testid="column-filter"
          className="select is-link"
          onChange={ ({ target }) => setColumn(target.value) }
        >
          { options.map((option) => (
            <option key={ option } value={ option }>{ option }</option>)) }
        </select>
      </label>
      <label htmlFor="comparison" className="label">
        Comparison Filter
        <select
          name="comparison"
          id="comparison"
          data-testid="comparison-filter"
          className="select is-link"
          onChange={ ({ target }) => setComparison(target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="value" className="label">
        Value
        <input
          onChange={ ({ target }) => setValue(target.value) }
          type="number"
          value={ value }
          data-testid="value-filter"
          className="input is-info"
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        className="button is-info is-rounded"
        onClick={ () => (setNumberFilter({ column, comparison, value })) }
      >
        Filter
      </button>
    </header>
  );
}
