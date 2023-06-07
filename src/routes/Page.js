import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';

function SubPage(props) {
  //테스트
  const [inputValue, setInputValue] = useState('');
  const [showWarning, setShowWarning] = useState(false);
  let [count, setCount] = useState(0)
  let [alert, setAlert] = useState(true)
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

  const handleChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 숫자 이외의 문자가 포함되어 있는지 검사
    if (/\D/.test(value)) {
      setShowWarning(true); // 경고 메시지 표시
    } else {
      setShowWarning(false); // 경고 메시지 숨김
    }
  };

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
      <button onClick={() => { setCount(count + 1) }}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
        </div>
        <div className="col-md-6">
          <div>
            <input type="text" value={inputValue} onChange={handleChange} />
            {showWarning && <div>숫자 이외의 문자가 입력되었습니다!</div>}
          </div>
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )
}


export { SubPage }
