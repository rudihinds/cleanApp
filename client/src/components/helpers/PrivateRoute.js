import React from 'react'
import { Redirect, Route } from 'react-router-dom'

class PrivateRoute extends React.PureComponent {
   componentWillUpdate = () => {

  }

  render() {
    const {component: Component, currentUser, ...rest} = this.props

    if (currentUser === null || currentUser === undefined) {
      return null
    }
    return (
      <Route
        {...rest}
        render={(props) => currentUser.is_cleaner
          ? <Component {...props} />
          : <Redirect 
              to={{
                pathname: '/new-booking',
                state: "you need to be a registered provider to see this page"
              }}
            />}
      />
    )
  }
}

export default PrivateRoute;