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
            {title.map((list, i) => {
                return (
                    <div className='list' key={i}>
                        <h4
                            onClick={() => {
                                if (modal == false) {
                                    setModal(true)
                                    setModalTitle(i)
                                }
                                if (modal == true) {
                                    setModal(false)
                                }
                            }}
                        >
                            {title[i]}
                            <span
                                className='btn_likes'
                                onClick={() => {
                                    let copy = [...like]
                                    copy[i] = copy[i] + 1
                                    changeLike(copy)
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
