import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import data from './date.js';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import { SubPage } from './routes/Page';
import userEvent from '@testing-library/user-event';
import axios from 'axios';



function App() {

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/sub') }}>Card</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/sub/:id' element={<SubPage shoes={shoes} />} />
        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>맴버임</div>} />
          <Route path='location' element={<div> 위치 정보임 </div>} />
        </Route>
        <Route path='*' element={<div>404 Error</div>} />
      </Routes>

    </div>
  );

  function About() {
    return (
      <div>
        <h4>회사정보임</h4>
        <Outlet />
      </div>
    )
  }

  function Card(props) {
    return (
      <div className="col-md-4">
        <img src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`} width="80%" />
        <h4>{props.shoes.title}</h4>
        <p>{props.shoes.content}</p>
      </div>
    )
  }

  function MainPage() {
    return (
      <>
        <div className='main-bg'></div>
        <div className="container">
          <div className="row">
            {shoes.map((a, i) => {
              return (<Card shoes={shoes[i]} i={i} key={i}/>
              )
            })}
          </div>
        </div>
        <button onClick={() => {
          axios.get('https://codingapple1.github.io/shop/data2.json')
          .then((결과) => {
            console.log(결과.data)
            let copy = [...shoes, ...결과.data];
            setShoes(copy);
          }).catch(() => { console.log('서버 연결 실패');
          
        })
        }}>더보기</button>
      </>


    )
  }



}


export default App;
