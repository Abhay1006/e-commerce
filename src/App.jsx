import './App.css';
import React, { useState, useEffect } from 'react';

// Fetch car data from the JSON file
import carData from './carvana_data_2.json'; // Assuming the file is placed in the src folder or properly imported

function Filters({ onFilterChange }) {
  const [maker, setMaker] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  const handleFilterChange = () => {
    onFilterChange({ maker, minPrice, maxPrice, minYear, maxYear });
  };

  return (
    <div className="filters">
      <h4>Filters</h4>
      <label>Maker</label>
      <input type="text" value={maker} onChange={(e) => setMaker(e.target.value)} />

      <label>Min Price</label>
      <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />

      <label>Max Price</label>
      <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />

      <label>Min Year</label>
      <input type="number" value={minYear} onChange={(e) => setMinYear(e.target.value)} />

      <label>Max Year</label>
      <input type="number" value={maxYear} onChange={(e) => setMaxYear(e.target.value)} />

      <button onClick={handleFilterChange}>Apply Filters</button>
    </div>
  );
}

function Products() {
  const [filteredCars, setFilteredCars] = useState(carData);
  const [sortOption, setSortOption] = useState('');

  const handleFilterChange = (filters) => {
    let filtered = carData.filter(car => {
      return (!filters.maker || car.maker.toLowerCase() === filters.maker.toLowerCase()) &&
             (!filters.minPrice || car.price >= filters.minPrice) &&
             (!filters.maxPrice || car.price <= filters.maxPrice) &&
             (!filters.minYear || car.year >= filters.minYear) &&
             (!filters.maxYear || car.year <= filters.maxYear);
    });
    setFilteredCars(filtered);
  };

  const handleSortChange = (e) => {
    const { value } = e.target;
    setSortOption(value);

    let sortedCars = [...filteredCars];
    if (value === 'price') {
      sortedCars.sort((a, b) => a.price - b.price);
    } else if (value === 'year') {
      sortedCars.sort((a, b) => b.year - a.year);
    } else if (value === 'mileage') {
      sortedCars.sort((a, b) => a.mileage - b.mileage);
    }
    setFilteredCars(sortedCars);
  };

  return (
    <div className="products-page">
      <div className="sidebar">
        <Filters onFilterChange={handleFilterChange} />
      </div>
      <div className="main-content">
        <div className="sort">
          <label>Sort by: </label>
          <select value={sortOption} onChange={handleSortChange}>
            <option value="">Select</option>
            <option value="price">Price</option>
            <option value="year">Year</option>
            <option value="mileage">Mileage</option>
          </select>
        </div>
        <div className="product-list">
          {filteredCars.map(car => (
            <div className="product" key={car.vehicle_id}>
              <h3>{car.maker} {car.model}</h3>
              <p>Price: ${car.price}</p>
              <p>Year: {car.year}</p>
              <p>Mileage: {car.mileage} miles</p>
              <p>Location: {car.location.city}, {car.location.stateAbbreviation}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Products />
    </div>
  );
}

export default App;
