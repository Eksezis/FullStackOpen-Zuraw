const Search = ({ search, onSearchChange }) => (
    <div>
      filter shown with: 
      <input value={search} onChange={onSearchChange} />
    </div>
  )

  export default Search