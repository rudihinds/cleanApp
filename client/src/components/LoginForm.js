import React from 'react'
import API from '../adapters/API'
import { dialog } from '@material-ui/core/Dialog'

class LoginForm extends React.Component {
  state = {
    user: {
      username: '',
      password: ''
    },
    errors: []
  }

  handleChange = (key, value) => {
    this.setState({user: {...this.state.user, [key]: value}})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = []
    if (this.state.user.username === '') errors.push('The username cannot be blank')
    if (this.state.user.password === '') errors.push('The password cannot be blank')

    if (errors.length === 0) {
      this.setState({
        user: {
          email: '',
          password: ''
        },
        errors: []
      })
      
      API.logIn(this.state.user)
        .then(resp => {
          if (resp.errors) {
            this.setState({ errors: resp.errors })
          } else {
            this.props.handleLogIn();
            this.props.toggleModal();
          }
          
        })
    } else {
      this.setState({ errors })
    }
  }

  render() {
    return (
      < Dialog>
      <div style={{padding: '10px'}}>
        <p>Login to view your customised feed.</p>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign In</h1>
          {this.state.errors.map((error, i)=> <p key={`error${i}`} style={{color: 'red'}}>{error}</p>)}
          <div>
            <label htmlFor='email' >Email</label>
            <input type='text' id='email' name='email' required={true} value={this.state.user.username} onChange={(e) => this.handleChange('email', e.target.value)} />
          </div>
          <div>
            <label htmlFor='Password'>Password</label>
            <input type='password' id='password' name='password' required={true} value={this.state.user.password} onChange={(e) => this.handleChange('password', e.target.value)} />
          </div>
          <div>
            <button type='submit'>Submit</button>
          </div>
          <hr/>
          <p onClick={this.props.handleClick}>If you do not already have an account, click here to sign up.</p>
        </form>
      </div>
      </Dialog>
    )
  }
}

export default LoginForm;