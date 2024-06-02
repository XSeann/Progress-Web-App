//REACT
import { Fragment, useState } from 'react'

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

    const deleteData = async (id) => {
        const responseDel = await fetch(`${props.link}/${id}`, {
            method: "DELETE"
        })
        
        const responseDelJSON = await responseDel.json()

        props.onClickDel && props.onClickDel()

        console.log(responseDelJSON)
    }

    return(
        <div className={`selectBarBox ${props.buttonSide ? "hasButton" : ""}`}>
            <span className={`selectBarSelected ${!props.buttonSide && "cursor"}`} style={props.styleSelect ? props.styleSelect : {}} onClick={() => !props.buttonSide && setMoveDown(e => !e)}>{choose !== '' ? choose : props.headData ? props.headData : 'Select'}</span>
            {props.buttonSide && <span className='selectBarButton cursor button' onClick={() => setMoveDown(e => !e)}></span>}
            <div className={`selectBarContentsArmor ${moveDown ? "moveDownContentsArmor" : ""}`} style={props.styleBar ? props.styleBar : {}}>
                <div className={`selectBarContents ${moveDown ? "moveDownContents" : ""} ${props.delData ? "gridColTwo" : ""}`} style={props.styleBar ? props.styleBar : {}}>
                    {(props.data && Array.isArray(props.data)) && props.data.map((e, pos) => 
                        <Fragment key={pos}>
                            <span onClick={() => down(e)} className="cursor" style={props.styleBarSelect ? (props.styleBarSelect.hover && hover.hov && hover.pos === pos) ? props.styleBarSelect.hover : props.styleBarSelect : {}} onMouseOver={() => hoverOver(pos)} onMouseOut={hoverOut}>{e.name}</span>
                            {props.delData ? <div className='deleteData' onClick={() => deleteData(e.id)}>X</div> : <></>}
                        </Fragment>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SelectBar