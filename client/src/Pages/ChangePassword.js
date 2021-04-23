import React from 'react';


const ChangePassword = (props) => {
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setconfirmPassword] = React.useState('')
    const handlePassword = (e) => {
        e.preventDefault()
        setNewPassword(e.target.value)
    }
    const handleConfirm = (e) => {
        e.preventDefault()
        setconfirmPassword(e.target.value)
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await fetch('/:user_id/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                   user_id: props.match.params.user_id,
                   confirmPassword
                })
            })

            
        } catch(err) {
            console.log(err)
        }
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="newPassword">Enter New Password</label>
            <input onChange={handlePassword} type="password" name="newPassword" value={newPassword}/>
            <label htmlFor="newPassword">confirm New Password</label>
            <input onChange={handleConfirm} type="password" name="confirmPassword" value={confirmPassword}/>
            <button type="submit">Enter</button>
        </form>
    )
}

export default ChangePassword;