import React from 'react';


const ForgotPassword = () => {
    const [email, setEmail] = React.useState('')
    return (
        <div>
        <h1>Enter your email and we will send you a temporary password to login. </h1>
        <input type="email" placeholder="enter your email" value={email}/>
        <button type="submit">Submit</button>
        </div>
    )
    }

export default ForgotPassword