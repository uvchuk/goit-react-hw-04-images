import { Notify } from 'notiflix';
import { BiSearch } from 'react-icons/bi';
import { useState } from 'react';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleGetQuery = ({ target: { value } }) => {
    setQuery(value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    if (query.trim() === '') {
      Notify.warning('Search query cannot be empty');
      return;
    }
    onSubmit(query);
    setQuery('');
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.buttonLabel}>{BiSearch()}</span>
        </button>
        <input
          className={css.input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleGetQuery}
          value={query}
        />
      </form>
    </header>
  );
};

export default Searchbar;
