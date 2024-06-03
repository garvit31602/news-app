import React, { useState } from 'react';
import './Navbar.css';

function Navbar({ setCategory, setSearchTerm }) {
  const categories = ["Business", "Entertainment", "General", "Health", "Science", "Sports", "Technology"];
  const [localSearchTerm, setLocalSearchTerm] = useState("");

  const changeCategory = (selectedCategory) => {
    setCategory(selectedCategory);
    console.log(selectedCategory);
  };

  const handleInputChange = (event) => {
    setLocalSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    setCategory(null)
    setSearchTerm(localSearchTerm);
    console.log(localSearchTerm);
  };

  const handleLogo = () =>{
    setSearchTerm("");
    setLocalSearchTerm("");
    setCategory(null);
  }

  return (
    <nav className='navbar'>
      <h1 className='navbar-heading' onClick={handleLogo}>nbnw</h1>
      <ul className='navbar-menu'>
        {categories.map((category, index) => (
          <li key={index} className='navbar-item' id={index}>
            <p className='category' onClick={() => changeCategory(category)}>{category}</p>
          </li>
        ))}
      </ul>
      <div className='search-bar'>
        <input
          type='text'
          placeholder='Search...'
          id='search'
          value={localSearchTerm}
          onChange={handleInputChange}
        />
        <button type='submit' onClick={handleSearch}>Search</button>
      </div>
    </nav>
  );
}

export default Navbar;
