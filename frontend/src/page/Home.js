//REACT
import {useEffect, useState} from 'react'

//HOOKS
import { useAuthContext } from '../hooks/useAuthContext'

//CSS
import './Home.css'

function Home() {
    const [homeData, setHomeData] = useState({taskCompleted: [], taskEmpty: false, hover: false, pos: 0, error: undefined})
    const {user} = useAuthContext()
    const link = process.env.REACT_APP_PRODUCTION === 'true' ? "https://progress-web-app.onrender.com" : "http://localhost:7000"

    async function getData() {
        const responseGet = await fetch(link + '/api/file/owner', {
            method: 'POST',
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({email: user.email})
        })

        const responseGetJSON = await responseGet.json()

        if (responseGet.ok) {
            setHomeData(e => ({...e, taskCompleted: responseGetJSON, taskEmpty: responseGetJSON.length ? false : true}))
        }

        if (!responseGet.ok) {
            setHomeData(e => ({...e, error: responseGetJSON}))
        }
    }

    useEffect(() => {
        getData()
    }, [])

    function gridTidy(num) {
        const gridSize = 100 / num
        let gridCol = ''
        for (let i = 0; i < num; i++) {
            gridCol += gridSize + "% "
        }
        return gridCol
    }

    function heightFix(num) {
        return `${num * 30}px`
    }

    function objectMap(obj) {
        const temporaryArray = []
        for (const key in obj) {
            if (Array.isArray(obj[key])) {
                for (const keys in obj[key]) {
                    temporaryArray.push(`${obj[key][keys][0]} : ${obj[key][keys][1]}`)
                }
            }
            if (!Array.isArray(obj[key])) {
                temporaryArray.push(`${key.toUpperCase()} : ${obj[key]}`)
            }
        }

        return (
            <>
                {temporaryArray.length ? temporaryArray.map((e, pos) => <span key={pos} className='taskDetail'>{e}</span>) : <></>}
            </>
        )
    }

    function Hover(bool, pos) {
        setHomeData(e => ({...e, hover: bool, pos: pos}))
    }
    
    return (
        <div className='Home'>
            {!homeData.taskEmpty ?
                <div className='taskBody'>  
                    {homeData.taskCompleted.length ? homeData.taskCompleted.map((e, pos) =>
                        <div className={`task ${(homeData.hover && homeData.pos === pos) ? '' : 'hidTxt'}`} key={pos} style={{gridTemplateRows: (homeData.hover && homeData.pos === pos) ? gridTidy(e.task.taskData.length + 1) : '100%', height: (homeData.hover && homeData.pos === pos) ? heightFix(e.task.taskData.length + 1) : '50px'}} onMouseOver={() => Hover(true, pos)} onMouseOut={() => Hover(false, pos)}>
                            {objectMap(e.task)}
                        </div>
                    ) : <></>}
                </div>
            :
                <span className='taskEmpty'>You have not posted any Task yet...</span>
            }
        </div>
    )
}

export default Home