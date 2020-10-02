import React, { useEffect, useState } from 'react';
import { getCourses } from '../api/courseApi';
import CurseList from './CurseList';


function CursesPage() {
  const [curses, setCurses] = useState([]);
  
  useEffect(() => {
    getCourses().then((_curses) => {
      setCurses(_curses);
      console.log(_curses);
    }).catch((_error) => {
      console.log(_error);
    });
  }, []);
  
  return (
    <div>
      <h2>Curses</h2>
      <CurseList curses={curses}/>
    </div>
  );
  
}

export default CursesPage;
