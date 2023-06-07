import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav } from 'react-bootstrap';
import {Context1} from './../App.js';


function SubPage(props) {

  let {재고} = useContext(Context1)

  let [count, setCount] = useState(0);
  let [alert, setAlert] = useState(true);
  let [탭, 탭변경] = useState(0);


  let { id } = useParams();
  let 찾은상품 = props.shoes.find(function (x) {
    return x.id == id
  });

  useEffect(() => {
    let a = setTimeout(() => { setAlert(false) }, 2000)
    return () => {
      clearTimeout(a)
    }
  }, [])



  return (
    <div className="container">
      {
        alert == true
          ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
          : null
      }
      {count}
      {재고}
      <button onClick={() => { setCount(count + 1) }}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">

          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link  onClick={()=>{ 탭변경(0) }} eventKey="link0">버튼0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=>{ 탭변경(1) }} eventKey="link1">버튼1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link  onClick={()=>{ 탭변경(2) }} eventKey="link2">버튼2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent shoes={props.shoes} 탭={탭} />
        
      
      

      </div>
    </div>
  )
}


function TabContent({탭, shoes}){

  let [fade, setFade] = useState('')
  let {재고} = useContext(Context1)

  useEffect(()=>{
    let a = setTimeout(()=>{setFade('end')}, 100)
    return ()=>{
    clearTimeout(a)
    setFade('')
    }
  },[탭])
  return (
    <div className={`start ${fade}`}>
      { [<div>{shoes[0].title}</div>, <div>{재고}</div>, <div>내용2</div>][탭] }
    </div>
  )
}





export { SubPage }
