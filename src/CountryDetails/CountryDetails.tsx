import * as React from 'react';  
import axios from "axios"; 
import "./CountryDetails.css";
import Modal from 'react-modal'; 

interface Props {
    country?: string;
    modalOpen?: any ; 
    todayCases: number;
    todayDeaths: number; 
    countryFlag: string;
    active: number;
    critical: number;
}

interface countryStates { 
  countryFlag: string;  
  modalOpen: any; 
  todayCases: number;
  todayDeaths: number; 
  active: number;
  critical: number;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        width: '50%',
        height: '80%',
        right: 'auto', 
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    },
  };


export default function CountryDetails(props: Props) {


  const [countryInfo, setCountryInfo] = React.useState<countryStates>(
    {
        countryFlag: '',
        modalOpen: false,
        todayCases: 0,
        todayDeaths: 0,
        active: 0,
        critical: 0
    }) 


  React.useEffect(() => { 
        setCountryInfo((prevState)=> ({...prevState, countryFlag: props.countryFlag, 
                                        modalOpen: props.modalOpen, 
                                        todayCases: props.todayCases,
                                        todayDeaths: props.todayDeaths,
                                        active: props.active,
                                        critical: props.critical }))   
          
  }, [props]); 

  return (  
        <Modal 
        isOpen={countryInfo.modalOpen}
        style={customStyles}> 
            <img className="countryFlag" src={countryInfo.countryFlag} />  
            <div className="countryRows">
                <h3>Today cases: {countryInfo.todayCases}</h3>  
                <h3>Today death: {countryInfo.todayDeaths}</h3> 
            </div> 
            
            <div className="countryRows">
                <h3>Today active: {countryInfo.active}</h3>  
                <h3>Today critical: {countryInfo.critical}</h3> 
            </div> 
            <button className="closeDetails" onClick={()=>setCountryInfo((prevState)=> ({...prevState,modalOpen: false }))   }>Close</button>
        </Modal>    

  );
}
