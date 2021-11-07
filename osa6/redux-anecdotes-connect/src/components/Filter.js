import React from 'react'
import { useDispatch } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const handleChange = (event) => {
        console.log(event.target.value)
        dispatch(updateFilter(event.target.value))
    }
    const style = {
        marginBottom: 10
    }
    return (
        <div style = {style}>
            <form>
                    <div>
                        filter
                        <input onChange={handleChange} />
                    </div>
            </form>
        </div>
    )
}

export default Filter