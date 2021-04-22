import React from 'react';
import { useParams } from 'react-router-dom'

function VerifyEmail() {
    const { token } = useParams();
    const {mentee_id} = useParams();
    const {mentor_id} = useParams();
    const [message, setMessage] = React.useState(null)

    React.useEffect(() => {
        async function verifyEmailToken() {
            setMessage('Checking a few things...')
            try {
                await fetch('/mentorship/verify-emailToken', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        token,
                        mentee_id,
                        mentor_id
                    })
                })

                setMessage(`Thanks for verifying your email :) `)
            } catch(err) {
                setMessage('There was an error verifying your email')
            }
        }

        verifyEmailToken()
    }, [mentee_id, mentor_id, token])

    return (
        <div>
            <h2>Verify Email Page</h2>
            {message && (<p>{message}</p>)}
        </div>
    )
}

export default VerifyEmail