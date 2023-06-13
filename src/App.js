/* eslint-disable */
import { useState } from 'react'
import './App.css'

function App() {
    // import{useState}
    // useState(보관할 자료)
    // let [작명, 작명]
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])
    let [like, changeLike] = useState(0)
    let [modal, setModal] = useState(false) //닫힌상태
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
                    // copy.sort((a, b) => {
                    //     if (a < b) return -1
                    //     if (a > b) return 1
                    //     if (a == b) return 0
                    // })
                    copy.sort() // 숫자,영문,한글 모두 오름차순(by defualt)/작은값부터 큰값으로 나열
                    setTitle(copy)
                }}
            >
                가나다 정렬
            </button>
            <div className='list'>
                <h4>
                    {title[0]}
                    <span
                        onClick={() => {
                            // onClick={} 안에는 꼭 변경함수로 state변경할 것 ✅
                            // state 변경하는 법(등호로 변경금지)
                            // state변경함수(새로운state)
                            changeLike(like + 1)
                        }}
                    >
                        {' '}
                        👍{' '}
                    </span>
                    <strong>{like}</strong>
                </h4>
                <p>2월 17일 발행</p>
            </div>
            <div className='list'>
                <h4>{title[1]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className='list'>
                <h4
                    onClick={() => {
                        if (modal == false) {
                            setModal(true)
                        }
                        if (modal == true) {
                            setModal(false)
                        }
                        // 아니면,
                        // setModal(!modal)
                        // 위는 값을 반대로 바꿔준다
                    }}

                    /*
                        동적 UI 만드는 스텝 ✅
                        1. html, css 디자인 완성
                        2. UI 현재상태를 state로 저장
                        3. state에 따라 UI가 어떻게 보일지 작성
                    */
                >
                    {title[2]}
                </h4>
                <p>2월 17일 발행</p>
            </div>
            {
                //html 중간에 조건문 쓰려면 , 삼항연산자(ternary operator)
                modal == true ? <Modal /> : null
            }
        </div>
    )
}

export default App

// const Modal = () => {}

function Modal() {
    return (
        <div className='modal'>
            <h4>제목</h4>
            <p>날짜</p>
            <p>상세내용</p>
        </div>
    )
}
/*
(참고) Destructuring 문법
let num = [1, 2]
let [a, c] = [1, 2]
num[0]   // 1
num[1]   // 2
*/

//컴포넌트의 단점: state를 가져다 쓸 때 문제생김
//A함수에 있던 변수는 B함수에서 맘대로 가져다 쓸 수 없음
