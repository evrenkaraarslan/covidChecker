import * as React from 'react';  
import axios from "axios";
import Select from 'react-select'; 
import './CovidData.css';

interface mainStates { 
  country: string;  
  countryOptions: any;
  searchClicked: boolean;
  countryName: string;
  confirmedCases: number;
  recovered: number;
  activeCasesPerOneMillion: number;
  deaths: number;
  todayDeaths: number;
  population: number;
}
export default function CovidData() {


  const [informations, setInformations] = React.useState<mainStates>(
    {
    country: '', 
    countryOptions: '',
    searchClicked: false,
    countryName: '',
    confirmedCases: 0,
    recovered: 0,
    activeCasesPerOneMillion: 0,
    deaths: 0,
    todayDeaths: 0,
    population: 0}) 


  React.useEffect(() => {
    axios
      .get(`https://corona.lmao.ninja/v2/countries`)
      .then((res) => { 
        setInformations((prevState)=> ({...prevState, countryOptions: res.data })); 
       const countriesArray = res.data.map((labels: any)=> ({value: `${labels.country}`, label: `${labels.country}`}))
       setInformations((prevState)=> ({...prevState, countryOptions: countriesArray }));
      });   
       
  }, []);

  const doSearch = (country: String) => { 
      axios
      .get(`https://corona.lmao.ninja/v2/countries/${country}?today`)
      .then((res) => {
        console.log(res.data);
        setInformations((prevState: any)=> ({...prevState,  
                        countryName: res.data.country,
                        confirmedCases: res.data.cases,
                        recovered: res.data.recovered,
                        searchClicked: true,
                        activeCasesPerOneMillion: res.data.casesPerOneMillion,
                        deaths: res.data.deaths,
                        todayDeaths: res.data.todayDeaths,
                        population: res.data.population} ));
      }).catch(()=> alert(`No information for ${country}, we are sorry for that`));
  }; 

  return (

    <div className="CovidDataMain">     

        <h1>Welcome to covid19 information website</h1>
        <div className='selectDiv'> 
          <Select
          options={informations.countryOptions} 
          onChange={(e: any) => setInformations((prevState)=>({...prevState, country: e.value}))}
          placeholder="Search or Select the country"
          />
        </div> 
        <button className='searchButton'
          onClick={() => {
            doSearch(informations.country);
          }}
        >
          Do search
        </button>  

        {
          informations.searchClicked && (
            <div className='searchResultDiv'>


                <img className="covidImage" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17700/production/_117500069_9db48266-1bb0-40c4-9c75-b6d2b06c30be.jpg" />
               
                <div className='searchLabelDiv'>

                    <p>Country: {informations.countryName}</p>

                    <p>Total confirmed cases: {informations.confirmedCases}</p>

                    <p>Total recovered cases: {informations.recovered}</p> 

                    <p>Total active cases: {informations.activeCasesPerOneMillion}</p> 

                    <p>Total death: {informations.deaths}</p> 

                    <p>Today death: {informations.todayDeaths}</p> 

                    <p>Population: {informations.population}</p> 

                    <button className="buttonClose" onClick={()=>setInformations((prevState)=> ({...prevState, searchClicked: false }))}>Close</button>
                    
                </div> 

                <img className="covidImage" src="https://ichef.bbci.co.uk/news/976/cpsprodpb/17700/production/_117500069_9db48266-1bb0-40c4-9c75-b6d2b06c30be.jpg" />


            </div>
            )
          }
    </div>

  );
}
