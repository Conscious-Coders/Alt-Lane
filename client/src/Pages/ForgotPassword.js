import React from 'react';


const ForgotPassword = () => {
    const [email, setEmail] = React.useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch('/forgotPasswordEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   email
                })
            })

            
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <div>
        <h2>Enter your email and we will send you a link to change your password. </h2>
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="enter your email" value={email}/>
        <button type="submit">Submit</button>
        </div>
    )
    
}

export default ForgotPassword