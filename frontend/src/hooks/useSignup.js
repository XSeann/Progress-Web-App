//REACT
import { useState } from "react"

export function useSignup() {
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(null)

    async function submitSignup(email, password) {
        const responsePost = await fetch('https://progress-web-app.onrender.com/api/user/signup', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({email, password})
        })

        const responsePostJSON = await responsePost.json()

        if (responsePost.ok) {
            setSuccess(true)
            setError(null)
        }

        if (!responsePost.ok) {
            setSuccess(false)
            setError(responsePostJSON.error)
        }
    }

    return {submitSignup, error, success}
}