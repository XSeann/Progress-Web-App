//REACT
import {useState, Fragment} from 'react'

//CSS
import './Form.css'

const Form = (props) => {
    const [form, setForm] = useState({})

    const changeStyle = (style, pos, pos2) => {  
        const sort = (obj) => {
            const arr = []
            for (const i in obj) {
                arr.push(i)
            }
            return arr
        }

        if (!form.hoverStyle) { 
            const objOrig = {}
            const objStyle = sort(style)
            const hoverStyle = sort(style.hover)

            for (let i = 0; i < objStyle.length; i++) {
                if (hoverStyle.indexOf(objStyle[i]) !== -1) {
                    objOrig[objStyle[i]] = style.hover[hoverStyle[i]]
                }
                else {
                    objOrig[objStyle[i]] = style[objStyle[i]]
                }
            }
            setForm(e => ({...e, [`hoverStyle${pos}${pos2}`]: objOrig}))
        }
        
        setForm(e => ({...e, [`hover${pos}${pos2}`]: true}))
    }

    const gridTidy = (num) => {
        const gridSize = 100 / num
        let gridCol = ''
        for (let i = 0; i < num; i++) {
            gridCol += (gridSize - 0.35) + "% "
        }
        return gridCol
    }

    const element = (elem, type, name, plc, val, id, className, style, onClick, pos, pos2) => {
        if (elem === 'inp') {
            return <input type={type} name={name} placeholder={plc} 
                        value={val ? val : (form[`${name}${pos}${pos2}`] ? form[`${name}${pos}${pos2}`] : "")} style={(form[`hover${pos}${pos2}`] && style && style.hover) ? form[`hoverStyle${pos}${pos2}`] : style}
                        className={className ? className : ''} id={id ? id : ''}
                        onClick={() => onClick && onClick()}
                        onChange={(x) => setForm(e => ({...e, [`${name}${pos}${pos2}`]: x.target.value}))} 
                        onMouseOver={() => (style && style.hover) && changeStyle(style, pos, pos2)}
                        onMouseOut={() => (style && style.hover) && setForm(e => ({...e, [`hover${pos}${pos2}`]: false}))}
                    />
        }
        if (elem === 'lbl') {
            return <label name={name} className={className ? className : ''} id={id ? id : ''}>{val}</label>
        }
        if (elem === 'txA') {
            return <textarea name={name} className={className ? className : ''} id={id ? id : ''} placeholder={plc} ></textarea>
        }
        if (elem === 'cmp') {
            return props.elem[pos][pos2].cmp
        }
    }

    const submit = async (ev) => {
        ev.preventDefault()

        if (!props.link) {
            return console.log("No Link")
        }

        const formPost = await fetch(props.link, {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(form)
        })

        const formPostJson = formPost.json()
        
        if (formPost.ok) {
            for (const key in form) {
                form[key] = ""
            }
            setForm(e => ({...e}))
        }

        if (!formPost.ok) {
            setForm(e => ({...e, error: formPostJson.error}))
        }
    }

    console.log(form)
 
    return (
        <form className="formContainer" style={props.style ? props.style : {}} onSubmit={props.disableAutoSubmit ? async (ev) => {ev.preventDefault()} : submit} autoComplete={props.autoComplete}>
            {props.elem && props.elem.map((e, posE) => <div className='elementsBox' key={posE} style={(e.length < 6) ? {gridTemplateColumns: gridTidy(e.length)} : {gridTemplateColumns: `20% 20% 20% 19% 19%`}}>
                {e && e.map((x, posX) => <Fragment key={posX}>{element(x.elem, x.type, x.name, x.plc, x.value, x.id, x.className, x.style, x.onClick, posE, posX)}</Fragment>)}
            </div>)}
        </form>
    )
}

export default Form