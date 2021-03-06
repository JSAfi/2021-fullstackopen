/* eslint-disable linebreak-style */
import React from 'react'

const Notification = ({ message, type }) => {
  if(message === null) {
    return null
  }

  return (
    <div className = "note">
      {message}
    </div>
  )
}

export default Notification