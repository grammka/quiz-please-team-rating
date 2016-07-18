import React from 'react'
import { Link } from 'react-router'
import CSSModules from 'react-css-modules'
import style from './style'

import data from '../../../static/data'

//const teamNames = data.teamNames.slice(0).sort()


export default CSSModules(() => {
  return (
    <div styleName="container">
      {
        data.teams.map((team, index) => {
          return (
            <Link key={ index } styleName="item" to={ `/team/${ team.name }` }>
              <div styleName="name">{ team.name }</div>
              <div styleName="gamesPlayed">{ team.playedGamesCnt }</div>
            </Link>
          )
        })
      }
    </div>
  )
}, style)
