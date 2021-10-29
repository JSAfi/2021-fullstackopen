
import React from 'react'

const Notification = ({note}) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {note}
    </div>
  )
}

export default Notification