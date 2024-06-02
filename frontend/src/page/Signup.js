//REACT
import { useState } from 'react'

//HOOKS
import {useSignup} from '../hooks/useSignup'

//COMPONENTS
import PopUp from '../components/PopUp'

//CSS
import './Signup.css'

function Signup() {
    const [signupData, setSignup] = useState({email: '', password: '', error: null, empty: [], ch: false})
    const {submitSignup, error, success} = useSignup()
    const link = process.env.REACT_APP_PRODUCTION === 'true' ? "https://progress-web-app.onrender.com" : "http://localhost:7000"

    async function submit(e) {
        e.preventDefault()

        const emailEmpty = !signupData.email.split("").filter(e => e!==" ").length
        const passwordEmpty = !signupData.password.split("").filter(e => e!==" ").length
        const emptyFields = []

        if (emailEmpty) {
            emptyFields.push('Email')
        }

        if (passwordEmpty) {
            emptyFields.push('Password')
        }

        setSignup(e => ({...e, empty: emptyFields, ch: !signupData.ch}))

        if (emptyFields.length) {
            return
        }
        
        submitSignup(link + '/api/user/signup', signupData.email, signupData.password)

        if (success) {
            setSignup(e => ({...e, email: '', password: '', error: error, empty: []}))
        }

        if (!success) {
            setSignup(e => ({...e, error: error}))
        }
    }
    
    return(
        <div className='SignupPage'>
            <form className='signupForm' onSubmit={submit}>
                <span className='signupName'>SIGN UP</span>
                <label className='labelSignup labelEmailSignup'>Email</label>
                <input type='email' value={signupData.email} className={`emailSignup ${signupData.empty.indexOf('Email') !== -1  ? 'error' : ''} ${((error && error[0] === 'E' && !signupData.empty.length)) ? 'error' : ''}`} placeholder='Email Here...' onChange={e => setSignup(f => ({...f, email: e.target.value}))}/>
                <label className='labelSignup labelPasswordSignup'>Password</label>
                <input type='password' value={signupData.password} className={`passwordSignup ${signupData.empty.indexOf('Password') !== -1  ? 'error' : ''} ${((error && error[0] === 'P' && !signupData.empty.length)) ? 'error' : ''}`} placeholder='Password Here...' onChange={e => setSignup(f => ({...f, password: e.target.value}))}/>
                <input type='submit' value={'Sign Up'} className={`submitButtonSignup`}/>
            </form>
            <div className='warnings'>
                {(signupData.empty.length) ? <PopUp message={`Fill: ${signupData.empty.toString()}`} style={{background: 'red', color: '#fff', fontWeight: '700'}} appear={signupData.ch}/> : ''}
                {(error && !signupData.empty.length) ? <PopUp message={error} style={{background: 'red', color: '#fff', fontWeight: '700'}} appear={signupData.ch}/> : ''}
                {(success && !signupData.empty.length) ? <PopUp message={'Signing Up was Successful!'} style={{background: 'green', color: '#fff', fontWeight: '700'}}/> : ''}
            </div>
        </div>
    )
}

export default Signup