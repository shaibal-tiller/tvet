import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Router from './Router/Router';
import Header from './Components/Header';
import Footer from './Components/Footer';
import { useState } from 'react';
import { AppContext } from './Context/GetContext';

function App() {
const [userData,setUserData] =useState()

  const data = {userData,setUserData}

  
  return (
    <AppContext.Provider value={data}>
    <BrowserRouter>
      <div className="App">
        <Header />
        <Router />
        <Footer />
      </div>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
