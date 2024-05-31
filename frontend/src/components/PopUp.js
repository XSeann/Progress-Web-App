//REACT
import { useEffect, useState } from "react"

//CSS
import "./PopUp.css"

const PopUp = (props) => {
    const [popUp, setPopUp] = useState({vis: 'popUpInvisible'})

    const test = () => {
        setTimeout(() => {
            setPopUp(e => ({...e, vis: 'moveUp'}))
        }, 1000)

        setTimeout(() => {
            setPopUp(e => ({...e, vis: 'moveDown'}))
        }, 3000)
        
        setTimeout(() => {
            setPopUp(e => ({...e, vis: 'popUpInvisible'}))
        }, 4000)
    }

    useEffect(() => {
        if (popUp.vis === 'popUpInvisible') {
            test()
        } //eslint-disable-next-line
    }, [props.appear]) 

    console.log(props)
    return(
        <div className="PopUpBoxCon" style={props.boxStyle ? props.boxStyle : {}}>
            <div className={`PopUpBox ${popUp.vis}`} style={props.style ? props.style : {}}>
                {props.message ? props.message : ""}
            </div>
        </div>
    )
}

export default PopUp