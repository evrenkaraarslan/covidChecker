import * as React from 'react';  
import CovidData from './CovidData/CovidData';
import Header from './Header/Header';

export default function App(){
  return (

    <div className="App">  
      <Header/>
      <CovidData />
    </div>

  );
}
