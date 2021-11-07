import React from 'react'
import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
    const handleChange = (event) => {
        console.log(event.target.value)
        props.updateFilter(event.target.value)
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

const mapDispatchToProps = {
    updateFilter,
}

export default connect(null, mapDispatchToProps)(Filter)