import React from 'react'
import {
  Switch,
  Route,
} from 'react-router-dom'
import Home from '../pages/home/home'
import Info from '../pages/info/info'
import Login from '../pages/login/login'
import NotFound from '../pages/notfound/notfound'
import PrivateRoute from '../higherOrderComponents/privateRoute'

export const Routes = () => {
  return (
    <Switch>
      <PrivateRoute component={Home} exact path="/" />
      <PrivateRoute component={Info} exact path="/info/:id" />
      <Route component={Login} path="/login" />
      <Route component={NotFound} />
    </Switch>
  )
}
