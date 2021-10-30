import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import notificationReducer from '../reducers/notificationReducer'

const Notification = () => {
    const dispatch = useDispatch()
    const notification = useSelector(n => n.notification)
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if(notification) {
    return (
        <div style={style}>
          {notification}
        </div>
      )
  }
  return null
}

export default Notification