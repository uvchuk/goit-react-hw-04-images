import { useState } from 'react';
import SearchBar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

const App = () => {
  const [query, setQuery] = useState('');

  return (
    <>
      <SearchBar onSubmit={setQuery} />
      <ImageGallery searchQuery={query} />
    </>
  );
};
export default App;
