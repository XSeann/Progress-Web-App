//REACT
import { useState } from 'react'

//CSS
import './SelectBar.css'

const SelectBar = (props) => {

    const [moveDown, setMoveDown] = useState(false)
    const [choose, setChoose] = useState('')
    const [hover, setHover] = useState({pos: undefined, hov: false})

    const down = (data) => {
        props.onClick && props.onClick(data)
        setChoose(data)
        setMoveDown(e => !e)
    }

    const hoverOver = (pos) => {
        setHover(() => ({pos: pos, hov: true}))
    }

    const hoverOut = () => {
        setHover(() => ({pos: undefined, hov: false}))
    }

    return(
        <div className={`selectBarBox ${props.buttonSide ? "hasButton" : ""}`}>
            <span className={`selectBarSelected ${!props.buttonSide && "cursor"}`} style={props.styleSelect ? props.styleSelect : {}} onClick={() => !props.buttonSide && setMoveDown(e => !e)}>{choose !== '' ? choose : props.headData ? props.headData : 'Select'}</span>
            {props.buttonSide && <span className='selectBarButton cursor button' onClick={() => setMoveDown(e => !e)}></span>}
            <div className={`selectBarContentsArmor ${moveDown ? "moveDownContentsArmor" : ""}`} style={props.styleBar ? props.styleBar : {}}>
                <div className={`selectBarContents ${moveDown ? "moveDownContents" : ""}`} style={props.styleBar ? props.styleBar : {}}>
                    {(props.data && Array.isArray(props.data)) && props.data.map((e, pos) => <span key={pos} onClick={() => down(e)} className="cursor" style={props.styleBarSelect ? (props.styleBarSelect.hover && hover.hov && hover.pos === pos) ? props.styleBarSelect.hover : props.styleBarSelect : {}} onMouseOver={() => hoverOver(pos)} onMouseOut={hoverOut}>{e}</span>)}
                </div>
            </div>
        </div>
    )
}

export default SelectBar