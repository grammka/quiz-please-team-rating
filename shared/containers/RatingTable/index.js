import React from 'react'
//import VanillaKinetic from 'vanilla.kinetic/vanilla.kinetic'
import isMobile from 'isMobile'
import addEventListeners from './addEventListeners'
import { Link } from 'react-router'
import cx from 'classnames'
import CSSModules from 'react-css-modules'
import style from './style'

import data from 'data'


@CSSModules(style, { allowMultiple: true })
export default class RatingTable extends React.Component {
  constructor() {
    super()

    this.state = {
      hoveredIndex: undefined
    }
  }

  componentDidMount() {
    const header      = this.refs.header
    const sidebar     = this.refs.sidebar
    const container   = this.refs.container
    const content     = this.refs.content

    // new VanillaKinetic(container, {
    //   filterTarget: (target, e) => {
    //     console.log(target, e)
    //
    //     if (!/down|start/.test(e.type)) {
    //       return !(/area|a|input/i.test(target.tagName))
    //     }
    //   }
    // })

    if (!isMobile) {
      addEventListeners({ header, sidebar, container, content })
    }
  }

  render() {
    return (
      <div styleName="wrapper">

        <div styleName="header">
          <div ref="header" styleName="headerContent">
            <div styleName="cell cellResult cellRank">Ранг</div>,
            <div styleName="cell cellResult cellRoundCnt">Кол. игр</div>,
            <div styleName="cell cellResult cellSumm">Сумма</div>,
            <div styleName="cell cellResult cellAvg">Среднее</div>,
            <div styleName="cell cellResult cellPercent">%</div>
            {
              Array.apply(null, { length: data.gamesCnt }).map(Number.call, Number).map((item, index) => {
                const gameNum = data.gamesCnt - index
                return (
                  <div key={ index } styleName="cell">{ `Игра ${ gameNum }` }</div>
                )
                return (
                  <Link key={ index } styleName="cell" to={ `/game/${ gameNum }` }>{ `Игра ${ gameNum }` }</Link>
                )
              })
            }
          </div>
        </div>

        <div styleName="sidebarHeader">
          <div styleName="sidebarRowIndex">
            <div styleName="faq">
              ?
              <div styleName="hint">
                <ul>
                  <li>Положение команд в рейтинговой таблице определяется средним значением процента попаданий в первое место за каждый раунд</li>
                  <li>Положение команд с кол-вом сыгранных раундов меньше 5 считается отдельно и отделяется горизонтальной чертой</li>
                  <li>Если вы нашли ошибку или у вас есть пожелания, пожалуйста, пишите на <a href="mailto:grammka@gmail.com">grammka@gmail.com</a></li>
                </ul>
              </div>
            </div>
          </div>
          Название команды
        </div>

        <div styleName="sidebar">
          <div ref="sidebar">
            {
              data.teams.map((team, index) => {
                const styleName = cx('sidebarRow', {
                  'nextGroupStarts': team.nextGroupStarts
                })

                return (
                  <Link key={ index } styleName={ styleName } to={ `/team/${ team.name }` }>
                    <div styleName="sidebarRowIndex">{ index + 1 }</div>
                    { team.name }
                  </Link>
                )
              })
            }
          </div>
        </div>

        <div ref="container" styleName="container">
          <div ref="content" styleName="content">
            {
              data.teams.map((team, index) => {
                let rank

                if (team.sumPoints > 1000) {
                  rank = ''
                } else if (team.sumPoints > 500) {
                  rank = 'генералы'
                } else if (team.sumPoints > 250) {
                  rank = 'лейтенанты'
                } else if (team.sumPoints > 100) {
                  rank = 'сержанты'
                } else {
                  rank = ''
                }

                const styleName = cx('contentRow', {
                  'nextGroupStarts': team.nextGroupStarts
                })

                return (
                  <div key={ index } styleName={ styleName }>
                    <div styleName="cell cellResult cellRank">{ rank }</div>
                    <div styleName="cell cellResult cellRoundCnt">{ team.playedGamesCnt }</div>
                    <div styleName="cell cellResult cellSumm">{ team.sumPoints }</div>
                    <div styleName="cell cellResult cellAvg">{ team.avgPoints }</div>
                    <div styleName="cell cellResult cellPercent">{ team.winPercent }</div>
                    {
                      team.games.reverse().map((value, index) => {
                        if (value == '-') {
                          value = ''
                        }

                        return (
                          <div key={ index } styleName="cell">{ value }</div>
                        )
                      })
                    }
                  </div>
                )
              })
            }
          </div>
        </div>

      </div>
    )
  }
}
