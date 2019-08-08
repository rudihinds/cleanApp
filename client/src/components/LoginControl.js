import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'

class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      this.state = {isLoggedIn: false};
    }
  
    // handleLoginClick = () => this.setState({isLoggedIn: true});
    // handleLogoutClick = () => this.setState({isLoggedIn: false});

    toggleLoggedIn = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }
    
    render() {
      const isLoggedIn = this.state.isLoggedIn;
      let button;
  
      if (isLoggedIn) {
        button = <LogoutButton toggleLoggedIn={this.toggleLoggedIn} toggleUserLogIn={this.props.toggleUserLogIn} />;
      } else {
        button = <LoginButton toggleLoggedIn={this.toggleLoggedIn} toggleUserLogIn={this.props.toggleUserLogIn} />;
      }
  
      return (
        <div>
          {button}
        </div>
      );
    }
  }
 
  export default LoginControl