// Navbar.js
import React from 'react'
//import {Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import { useNavigate } from 'react-router-dom'; 
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';


export default function Navigationbar() {  
  return (
    // <nav>
    //   <Link to="/">Inicio</Link>
    //   <Link to="/grupos">Grupos</Link>
    // </nav>
    <>
     {/* <Navbar className="navbar" bg="dark" data-bs-theme="dark"> "bg" is to set a background */}
     <Navbar className="navbar text-dark" data-bs-theme="light"> 
      {/* La propiedad de data-bs-theme influye mucho, si se esta habilitada se va a sobreponer a la propiedad directa del color. 
      light/dark ; si estas trabajando con un background oscuro, usar dark / background claro usar light
      */}

        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/grupos">Grupos</Nav.Link>           
            <Nav.Link href="/report">Report</Nav.Link>           
          </Nav>
        </Container>
      </Navbar>      
    </>   
  );
}