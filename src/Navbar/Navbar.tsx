import * as React from 'react';   
import "./Navbar.css"; 

type Props = { 
    children?: React.ReactNode
  };

export default function Navbar({children} : Props) { 

  return (   
      <div className="navbarMain">
          {children}
      </div>
  );
}
