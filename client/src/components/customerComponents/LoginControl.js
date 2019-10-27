import React from 'react'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import SignUpButton from './SignUpButton';

class LoginControl extends React.Component {
    constructor(props) {
      super(props);
      // this.state = {isLoggedIn: false};
    }
  
    // handleLoginClick = () => this.setState({isLoggedIn: true});
    // handleLogoutClick = () => this.setState({isLoggedIn: false});

    toggleLoggedIn = () => {
        this.setState({ isLoggedIn: !this.state.isLoggedIn })
    }
    
    render() {
      // const isLoggedIn = this.props.userLoggedIn;
      let button;
      let signupButton
  
      if (this.props.userLoggedIn) {
        button = <LogoutButton toggleLoggedIn={this.toggleLoggedIn} toggleUserLogIn={this.props.toggleUserLogIn} removeCurrentUser={this.props.removeCurrentUser} />;
        // signupButton = null
      } else {
        button = <LoginButton toggleLoggedIn={this.toggleLoggedIn} toggleUserLogIn={this.props.toggleUserLogIn } addCurrentUser={this.props.addCurrentUser} />;
        // signupButton = <SignUpButton/>
      }
  
      return (
        <div>
          
          <div>{button}</div>
          {/* <div>{signupButton}</div> */}

        </div>
      );
    }
  }
 
  export default LoginControl