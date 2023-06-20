/* eslint-disable */
import { useState } from 'react'
import './App.css'

function App() {
    // import{useState}
    // useState(보관할 자료)
    // let [작명, 작명]
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
    let [like, changeLike] = useState([0, 0, 0]) //좋아요버튼
    let [modal, setModal] = useState(false) //닫힌상태
    let [modalTitle, setModalTitle] = useState(0) //현재 모달UI상태를 state에 저장
    let [inputValue, changeInput] = useState('')
    /*
    [1, 2, 3].map((a) => {
            return '123123123'
        })
        // ["123123123", "123123123", "123123123"]
        // array 자료 갯수만큼 함수안의 코드 실행
        // 함수 파라미터는 array안에 있던 자료이다.
        // return 에 뭐 적으면 array 로 담아줌
    */
    return (
        <div className='App'>
            <div className='black-nav'>
                <h4>React Blog List</h4>
            </div>
            <button
                onClick={() => {
                    // state변경함수의 특징
                    // 기존 state == 신규 state의 경우 변경 안  해줌
                    // 만약, let title[0] = '여자코트 추천' 이라고 한다면, array만 수정되었고, 변수에 있던 화살표(주소)는 수정안됨. 즉 신규state와 기존state가 동일하다고 생각한다.(=>>state변경 안됨)
                    // 새로운 배열로 생성하여 카피본을 만들어 새로운 state를 만들고, state변경함수를 사용해 렌더링한다.
                    let copy = [...title] //spread 한 후에 []로 감싸 새로운 배열을 생성(즉, 원본배열 보존)
                    copy[0] = '여자코트 추천'
                    setTitle(copy)
                    // array/object는 참조변수. 실제 값은 heap(RAM)에 저장, 배열이나 객체가 담긴 배열은 값을 가리키는 주소만 저장
                }}
            >
                여자코트추천
            </button>{' '}
            <button
                onClick={() => {
                    let copy = [...title]
                    copy.sort() // 오름차순(by defualt), 작은값 >> 큰값으로 나열
                    setTitle(copy)
                }}
            >
                가나다 정렬
            </button>
            <div style={{ marginTop: '10px' }}>
                <input
                    onChange={(e) => {
                        // input에 입력한 값 가져오는 법
                        // 파라미터 e를 가져온다
                        // e: 현재 발생하는 이벤트에 관련한 여러 기능들이 담겨있는 일종의 변수
                        // e.target : 이벤트 발생한 html태그
                        // e.target.value : 이벤트 발생한 html 태그에 입력한 값
                        changeInput(e.target.value) // <- state변경함수는 늦게처리됨(비동기처리), 그래서 이거 완료되기 전에
                        console.log(inputValue) // <- 다음줄 실행해준다.(왜냐? 리액트 만든 사람이 이렇게 정함)
                    }}
                    type='text'
                />
                <button
                    onClick={(e) => {
                        //input에 입력된 state를 title array에 끼운다.
                        //배열 맨 앞에 요소추가 : unshift(elem)
                        inputValue = inputValue.split(' ').join('') //문자열의 모든 공백 제거
                        if (inputValue !== '') {
                            let copy = [...title]
                            copy.unshift(inputValue)
                            //setTitle함수를 통해 title state array를 update 해준다.
                            setTitle(copy)
                        }
                    }}
                >
                    저장
                </button>
            </div>
            {/* 
            onClick: 클릭했을 때, 코드실행
            onChange: 사용자가 타이핑을 할때마다, 코드실행
            onInput: 사용자가 입력란에서 포커스를 잃었을 때, 코드실행 
            onMouseOver: 사용자가 입력란에 마우스오버 했을 때, 코드실행
            onScroll: 사용자가 마우스 스크롤을 할때마다, 코드실행
            */}
            {title.map((list, i) => {
                return (
                    <div className='list' key={i}>
                        <button
                            className='btn-del'
                            onClick={(e) => {
                                let copy = [...title]
                                copy.splice(i, 1)
                                console.log(copy)
                                setTitle(copy)
                            }}
                        >
                            삭제
                        </button>
                        <h4
                            onClick={() => {
                                setModal(true)
                                setModalTitle(i)
                            }}
                        >
                            {title[i]}
                            <span
                                className='btn_likes'
                                onClick={(e) => {
                                    // 클릭이벤트는 상위 html로 퍼짐 (이벤트버블링)
                                    // 이벤트버블링 막기
                                    e.stopPropagation()
                                    let copy = [...like]
                                    copy[i] = copy[i] + 1
                                    changeLike(copy) //따봉변경
                                }}
                            >
                                {' '}
                                👍{' '}
                            </span>
                            <strong>{like[i]}</strong>
                        </h4>
                        <p>2월 17일 발행</p>
                    </div>
                )
            })}
            {
                //html 중간에 조건문 쓰려면 , 삼항연산자(ternary operator)
                modal == true ? (
                    <Modal title={title} setTitle={setTitle} modalTitle={modalTitle} />
                ) : null
            }
        </div>
    )
}
// 부모 -> 자식 state 전송
// 1. <자식컴포넌트 작명={state이름} />
// 2. props 파라미터 등록 후, props.작명 사용
export default App

function Modal(props) {
    return (
        <div className='modal'>
            <h4>{props.title[props.modalTitle]}</h4>
            <p>날짜</p>
            <p>상세내용</p>
            <button
                onClick={() => {
                    let copy = [...props.title]
                    copy[0] = '여자코트 추천'
                    props.setTitle(copy)
                }}
            >
                글수정
            </button>
        </div>
    )
}

// 📌 state를 만드는 곳은
// state 사용하는 컴포넌트들 중 '최상위'컴포넌트에 둔다.
// App컴포넌트(최상위 컴포넌트)

/*
✅ 꼭 기억할 것!!!
state만드는 법
props 전송하는 법
컴포넌트 만드는 법
UI만드는 step
*/
