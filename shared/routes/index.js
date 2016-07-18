import React from 'react'
import { Route } from 'react-router'

import RatingTable from 'containers/RatingTable'
import Team from 'containers/Team'
import Game from 'containers/Game'


export default (
  <Route>
    <Route path="/" component={ RatingTable } />
    <Route path="/team/:name" component={ Team } />
    <Route path="/game/:num" component={ Game } />
  </Route>
)
