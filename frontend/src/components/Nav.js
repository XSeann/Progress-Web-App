//REACT
import {Link} from 'react-router-dom'

//HOOKS
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

//CSS
import './Nav.css'

//LOGO
import Logo from '../logo/Logo'
import { useState } from 'react'

function Nav() {
    const [hover, setHover] = useState({pos: 0, hov: false})
    const {user} = useAuthContext()
    const {logout} = useLogout()

    function HoverOver(pos) {
        setHover({pos: pos, hov: true})
    }

    function HoverOut() {
        setHover({pos: 0, hov: false})
    }

    return (
        <nav className={`nav ${user ? 'navUserOk' : 'navUserNotOk'}`}>
            <Link to="" id='logoLink'><Logo/></Link>
            <span></span>
            {user ?
                <>
                    <Link to="Home" onMouseOver={() => HoverOver(1)} onMouseOut={() => HoverOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
                        </svg>
                        {(hover.pos === 1 && hover.hov) ? "Home" : ""}
                    </Link>
                    <Link to="Input" onMouseOver={() => HoverOver(2)} onMouseOut={() => HoverOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M0 80v48c0 17.7 14.3 32 32 32H48 96V80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48V384c0 35.3 28.7 64 64 64s64-28.7 64-64v-5.3c0-32.4 26.3-58.7 58.7-58.7H480V128c0-53-43-96-96-96H112zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16H314.7c-14.7 0-26.7 11.9-26.7 26.7V384c0 53-43 96-96 96H368h96z"/>
                        </svg>
                        {(hover.pos === 2 && hover.hov) ? "Task" : ""}
                    </Link>
                    <Link onClick={() => logout()} onMouseOver={() => HoverOver(3)} onMouseOut={() => HoverOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
                        </svg>
                        {(hover.pos === 3 && hover.hov) ? "Log Out" : ""}
                    </Link>
                    <Link onMouseOver={() => HoverOver(4)} onMouseOut={() => HoverOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                        {(hover.pos === 4 && hover.hov) ? <span id='user'>{user.email}</span> : ''}
                    </Link>
                </>
                :
                <>
                    <Link to="" onMouseOver={() => HoverOver(5)} onMouseOut={() => HoverOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M217.9 105.9L340.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L217.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1L32 320c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM352 416l64 0c17.7 0 32-14.3 32-32l0-256c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32l64 0c53 0 96 43 96 96l0 256c0 53-43 96-96 96l-64 0c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/>
                        </svg>
                        {(hover.pos === 5 && hover.hov) ? "Log In" : ""}
                    </Link>
                    <Link to="Signup" onMouseOver={() => HoverOver(6)} onMouseOut={() => HoverOut()}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="M96 0c17.7 0 32 14.3 32 32V64l352 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-352 0V480c0 17.7-14.3 32-32 32s-32-14.3-32-32V128H32C14.3 128 0 113.7 0 96S14.3 64 32 64H64V32C64 14.3 78.3 0 96 0zm96 160H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V192c0-17.7 14.3-32 32-32z"/>
                        </svg>
                        {(hover.pos === 6 && hover.hov) ? "Sign Up" : ""}
                    </Link>
                </>
            }
        </nav>
    )
}

export default Nav