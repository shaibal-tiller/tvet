import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetContext } from '../Context/GetContext';

const SearchComponent = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [errorText, setErrorText] = useState('No Match Found!')
  const base_url = process.env.REACT_APP_BACKEND
  const myContext = GetContext()
  const navigate = useNavigate()

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = (e) => {
    setSearchResults([])
    e.preventDefault()
    if (searchText.length > 8) {
      axios.get(`${base_url}/data/search-mobile?mobile=${searchText}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then(res => {
          res.data.length ? setErrorText("") : setErrorText("No Match Found!")
          setSearchResults(res.data);
        })
        .catch(e => {
          console.error(e);
        })
    }
    else {
      setErrorText('Need at least 9 digits!')
    }
  };

  const handleResultClick = (result) => {
    myContext.setUserData(result)
    navigate('/survey-by-search')
  }



  return (
    <div className='pt-4 pb-10'>
      <div className='md:px-[30%]'>
        <form onSubmit={handleSearch} className="flex items-center justify-center mb-4">
          <input
            type="number"
            value={searchText}
            onChange={handleSearchTextChange}

            className="appearance-none hover:appearance-none w-full px-4 py-2 border rounded-l-md focus:outline-none"
            placeholder="Enter mobile number"
          />
          <button
            type='submit'
            onClick={handleSearch}
            className="px-4 py-2 bg-gray-200 border border-l-0 rounded-r-md hover:bg-gray-300 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z" clipRule="evenodd" />
            </svg>

          </button>
        </form>
      </div>

      {searchResults.length > 0 ? (
        <div className="flex flex-col gap-4 md:flex-row justify-center px-4">

          {searchResults.map((item) => (
            <div
              key={item.id}
              className="bg-gray-200 p-4 rounded-md cursor-pointer text-start  hover:shadow-lg"
              onClick={()=>{handleResultClick(item)}}
            >
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p>Father's name: {item.father_name}</p>
              <p>Mother's name: {item.mother_name}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>{errorText}</p>
      )}
    </div>
  );
};

export default SearchComponent;
