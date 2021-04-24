import React from 'react'

export default function MenteeForm (initialData = {}) {
  const [menteeForm, setMenteeForm] = React.useState(initialData)

  function handleMentee (event) {
    const name = event.target.name
    const value = event.target.value

    setMenteeForm({
      ...menteeForm,
      [name]: value
    })
  }
  return {menteeForm, handleMentee }
}
