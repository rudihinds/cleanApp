const apiEndpoint = 'http://localhost:3000/api/v1'
const usersUrl = `${apiEndpoint}/users`
const cleanersUrl = `${apiEndpoint}/cleaners`
const customersUrl = `${apiEndpoint}/customers`



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

const getThisMonthsEarnings = cleanerId => {
  return fetch(`${cleanersUrl}/${cleanerId}/get_this_months_earnings`)
  .then(resp => resp.json())
  .catch(handleServerError)
}

const getLastMonthsEarnings = cleanerId => {
  return fetch(`${cleanersUrl}/${cleanerId}/get_last_months_earnings`)
  .then(resp => resp.json())
  .catch(handleServerError)
}

const getNextMonthsEarnings = cleanerId => {
  return fetch(`${cleanersUrl}/${cleanerId}/get_next_months_earnings`)
  .then(resp => resp.json())
  .catch(handleServerError)
}

export default {
  getThisMonthsEarnings,
  getLastMonthsEarnings,
  getNextMonthsEarnings
}