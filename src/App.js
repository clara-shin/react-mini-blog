import { useState } from 'react'
import './App.css'

function App() {
    // import{useState}
    // useState(보관할 자료)
    // let [작명, 작명]
    let [title, setTitle] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학'])

    return (
        <div className='App'>
            <div className='black-nav'>
                <h4>React Blog List</h4>
            </div>
            <div className='list'>
                <h4>{title[0]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className='list'>
                <h4>{title[1]}</h4>
                <p>2월 17일 발행</p>
            </div>
            <div className='list'>
                <h4>{title[2]}</h4>
                <p>2월 17일 발행</p>
            </div>
        </div>
    )
}

export default App

/*
(참고) Destructuring 문법
let num = [1, 2]
let [a, c] = [1, 2]
num[0]   // 1
num[1]   // 2
*/
