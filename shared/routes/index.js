import React from 'react'
import { Router, Route } from 'react-router'

import RatingTable from 'containers/RatingTable'
import Team from 'containers/Team'


export default (
  <Route>
    <Route path="/" component={ RatingTable } />
    <Route path="/team/:name" component={ Team } />
  </Route>
)
