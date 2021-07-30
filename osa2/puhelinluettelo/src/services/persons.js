import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteEntry = (targetId) => {
    const request = axios.delete(`${baseUrl}/${targetId}`)
    console.log(`${baseUrl}/${targetId}`)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log('updating', `${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll, create, deleteEntry, update
}