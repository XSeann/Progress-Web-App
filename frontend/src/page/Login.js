//REACT
import { useState } from 'react'

//HOOKs
import { useLogin } from '../hooks/useLogin'

//COMPONENTS
import PopUp from '../components/PopUp'

//CSS
import './Login.css'

function Login() {
    const [loginData, setLogin] = useState({email: '', password: '', empty: [], ch: false, error: null})
    const {login, error} = useLogin()
    const link = process.env.REACT_APP_PRODUCTION === 'true' ? "https://progress-web-app.onrender.com" : "http://localhost:7000"

    async function submit(e) {
        e.preventDefault()

        const emailEmpty = !loginData.email.split("").filter(e => e!==" ").length
        const passwordEmpty = !loginData.password.split("").filter(e => e!==" ").length
        const emptyFields = []

        if (emailEmpty) {
            emptyFields.push('Email')
        }

        if (passwordEmpty) {
            emptyFields.push('Password')
        }

        setLogin(e => ({...e, empty: emptyFields, ch: !loginData.ch}))

        if (emptyFields.length) {
            return
        }
        
        login(link + '/api/user/login', loginData.email, loginData.password)
        
        if (error !== null) {
            setLogin(e => ({...e, error: error}))
        }
        
        if (error === null) {
            setLogin(e => ({...e, email: '', password: '', empty: [], error: error}))
        }
    }

    console.log(link)
    
    return(
        <div className='LoginPage'>
            <form className='loginForm' onSubmit={submit}>
                <span className='loginName'>LOG IN</span>
                <label className='labelLogin labelEmailLogin'>Email</label>
                <input type='email' value={loginData.email} className={`emailLogin ${loginData.empty.indexOf('Email') !== -1  ? 'error' : ''} ${((error === 'Incorrect email' && !loginData.empty.length)) ? 'error' : ''}`} placeholder='Email Here...' onChange={e => setLogin(f => ({...f, email: e.target.value}))}/>
                <label className='labelLogin labelPasswordLogin'>Password</label>
                <input type='password' value={loginData.password} className={`passwordLogin ${loginData.empty.indexOf('Password') !== -1 ? 'error' : ''} ${((error  === 'Incorrect password' && !loginData.empty.length)) ? 'error' : ''}`} placeholder='Password Here...' onChange={e => setLogin(f => ({...f, password: e.target.value}))}/>
                <input type='submit' value={'Log In'} className={`submitButtonLogin`}/>
            </form>
            <div className='warnings'>
                {(loginData.empty.length) ? <PopUp message={`Fill: ${loginData.empty.toString()}`} style={{background: 'red', color: '#fff', fontWeight: '700'}} appear={loginData.ch}/> : ''}
                {(error && !loginData.empty.length) ? <PopUp message={error} style={{background: 'red', color: '#fff', fontWeight: '700'}}/> : ''}
            </div>
        </div>
    )
}

export default Login