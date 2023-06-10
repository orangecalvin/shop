import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import data from './date.js';
import { Suspense, createContext, lazy, useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet, json } from 'react-router-dom'
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
// import Cart from './routes/Cart.js'
// import SubPage from './routes/Page';

const SubPage = lazy(() => import('./routes/Page'));
const Cart = lazy( () => import('./routes/Cart.js'));




function App() {

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])

  let [shoes, setShoes] = useState(data);
  let [재고] = useState([10, 11, 12])
  let navigate = useNavigate();

  let result = useQuery('작명', ()=>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a)=>{ 
      console.log('요청됨');
      return a.data }),      
  )




  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">쇼핑몰</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/sub') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Card</Nav.Link>
          </Nav>
          <Nav className='ms-auto' > 
            {result.isLoading && '로딩중'}
            {result.error && '에러남'}
            {result.data && result.data.name}
            </Nav>
        </Container>
      </Navbar>
      <Suspense fallback={<div>로딩중임</div>}>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/sub/:id'
          element={
            <SubPage shoes={shoes} /> 
            } />

        <Route path='/cart' element={<Cart />} />

        <Route path='/about' element={<About />}>
          <Route path='member' element={<div>맴버임</div>} />
          <Route path='location' element={<div> 위치 정보임 </div>} />
        </Route>
        <Route path='*' element={<div>404 Error</div>} />
      </Routes>
      </Suspense>
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
              return (<Card shoes={shoes[i]} i={i} key={i} />
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
            }).catch(() => {
              console.log('서버 연결 실패');

            })
        }}>더보기</button>
      </>


    )
  }



}


export default App;
