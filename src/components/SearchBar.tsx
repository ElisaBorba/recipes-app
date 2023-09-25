function SearchBar() {
  return (
    <div>
      <input
        data-testid="ingredient-search-radio"
        type="radio"
        value="ingredient"
      />
      <label htmlFor="ingredient">Ingredient</label>
      <input
        data-testid="name-search-radio"
        type="radio"
        value="name"
      />
      <label htmlFor="name">Name</label>
      <input
        data-testid="first-letter-search-radio"
        type="radio"
        value="first-letter"
      />
      <label htmlFor="first-letter">First Letter</label>
      <button
        data-testid="exec-search-btn"
      >
        Search
      </button>

    </div>
  );
}

export default SearchBar;
