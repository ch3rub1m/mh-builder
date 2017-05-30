import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import Index from 'containers/Index'
import Mhp from 'containers/Mhp'
import Mhp2 from 'containers/Mhp2'

const App = () =>
  <Router>
    <Switch>
      <Route path='/' exact component={Index} />
      <Route path='/mhp' exact component={Mhp} />
      <Route path='/mhp2' exact component={Mhp2} />
    </Switch>
  </Router>

export default App
