const apiEndpoint = 'http://localhost:3000/api/v1'
const usersUrl = `${apiEndpoint}/users`
const cleanersUrl = `${apiEndpoint}/cleaners`
const customersUrl = `${apiEndpoint}/customers`
//eslint-disable-next-line 
const reviewsUrl = `${apiEndpoint}/customers`
const cleaningsUrl = `${apiEndpoint}/cleanings`
const loginUrl = `${apiEndpoint}/login`
const validateUrl = `${apiEndpoint}/validate`

const jsonify = res => res.json()

const handleServerError = response => {
    console.log('handle error: ', response)
    return {errors: response.errors}
}

const constructHeaders = (moreHeaders = {}) => (
    {
        'Authorization': localStorage.getItem('token'),
        ...moreHeaders
    }
)

const getUsers = () => {
    fetch(usersUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
    .then(console.log)
}

const getCleaners = () => {
    fetch(cleanersUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
    .then(console.log)
}

const getCustomers = () => {
    fetch(customersUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
    .then(console.log)
}

const getCleanings = () => {
    return fetch(cleaningsUrl, { headers: constructHeaders() })
    .then(resp => resp.json())
    
}

const getMyCleanings = (user_id) => {
    return fetch(`${usersUrl}/${user_id}/cleanings`, { headers: constructHeaders() })
    .then(resp => resp.json())
}

const deleteCleaning = (cleaningId) => {
    return fetch(`${cleaningsUrl}/${cleaningId}`, {
        method: 'DELETE',
        headers: constructHeaders({
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        })
    })
        .then(jsonify)
}

const getAvailableCleaners = (datetime, duration) => fetch('http://localhost:3000/api/v1/cleaners/available', 
{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ datetime, duration })
}
).then(res => res.json())
//  .then(console.log)

const signUp = user => fetch(usersUrl, { 
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
}).then(jsonify).then(data => {
    if (data.errors) {
        return {errors: data.errors}
    } else {
        localStorage.setItem('token', data.token)
        console.log("success: ", data.user)
        return {user: data.user}
    }
}).catch(handleServerError)

const login = user => fetch(loginUrl, {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({user})
}).then(jsonify).then(data => {
    if (data.errors) {
        console.log('errors: ', data.errors)
        return data.errors
    } else {
        localStorage.setItem('token', data.token)

        console.log('user: ', data.user)
        return data.user
    }
}).catch(handleServerError)


const validateUser = () => {
    if (!localStorage.getItem('token')) return Promise.resolve({error: 'no token'})
    return fetch(validateUrl, {
        headers: constructHeaders()
    }).then(jsonify).then(data => {
        localStorage.setItem('token', data.token)
        return data.user
        })
        .catch(handleServerError)
}

const createCleaning = (cleaning) => {
    fetch(cleaningsUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cleaning })
    }).then(resp => resp.json())
      .then(console.log)
}


const clearToken = () => localStorage.removeItem('token')

export default {
    getUsers,
    getCleaners,
    getCustomers,
    getCleanings,
    signUp,
    login,
    validateUser,
    clearToken,
    getAvailableCleaners,
    createCleaning,
    getMyCleanings,
    deleteCleaning
}