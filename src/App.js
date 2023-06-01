import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import data from './date.js';
import { useState } from 'react';



function App() {
  
  let [shoes] = useState(data)

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg'></div>

      <div className="container">
        <div className="row">

            {
              shoes.map((a, i)=>{
                return(
                <Card shoes={shoes[i]} i={i}/>
                )
              })
            }
        </div>
      </div>
    </div>
  );

  function Card(props){
    return (
      <div className="col-md-4">
        <img src={'https://codingapple1.github.io/shop/shoes' + (props.i+1) +'.jpg'} width="80%" />
        <h4>{props.shoes.title }</h4>
        <p>{props.shoes.content}</p>
      </div>
    )
  }
}


export default App;
