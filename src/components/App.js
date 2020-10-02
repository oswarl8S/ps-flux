import React from 'react';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import Header from './common/Header';
import CursesPage from './CursesPage';


function App() {
  
  function getPage() {
    const route = window.location.pathname;
    if (route === "/about") return <AboutPage />;
    if (route === "/curses") return <CursesPage />;
    return <HomePage />
  }
  return (
    <div>
      <Header/>
      {getPage()}
    </div>
  );
}

export default App;
