import React from 'react'
import CSSModules from 'react-css-modules'
import style from './style'

import data from '../../../static/data'


console.log(333, data)

@CSSModules(style, { allowMultiple: true })
export default class RatingTable extends React.Component {
  renderSidebarRow = (teamData, index) => {
    return (
      <div key={ index } styleName="sidebarRow">
        <div styleName="sidebarRowIndex">{ index + 1 }</div>
        { teamData.name }
      </div>
    )
  }

  renderContentCell = (value, index) => {
    if (value == '-') {
      value = ''
    }

    return (
      <div key={ index } styleName="cell">{ value }</div>
    )
  }

  renderContentRow = (teamData, index) => {
    let rank

    if (teamData.sumPoints > 1000) {
      rank = ''
    } else if (teamData.sumPoints > 500) {
      rank = 'генералы'
    } else if (teamData.sumPoints > 250) {
      rank = 'лейтенанты'
    } else if (teamData.sumPoints > 100) {
      rank = 'сержанты'
    } else {
      rank = ''
    }
    
    return (
      <div key={ index } styleName="contentRow">
        {
          teamData.games.map(this.renderContentCell)
        }
        <div styleName="cell cellResult cellRank">{ rank }</div>
        <div styleName="cell cellResult cellRoundCnt">{ teamData.playedGamesCnt }</div>
        <div styleName="cell cellResult cellSumm">{ teamData.sumPoints }</div>
        <div styleName="cell cellResult cellAvg">{ teamData.avgPoints }</div>
        <div styleName="cell cellResult cellPercent">{ teamData.winPercent }</div>
      </div>
    )
  }

  render() {
    return (
      <div styleName="wrapper">
        <div styleName="header">
          <div styleName="headerContent"></div>
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
          <div>
            {
              data.firstGroup.map(this.renderSidebarRow)
            }
            <div styleName="hr"></div>
            {
              data.secondGroup.map(this.renderSidebarRow)
            }
          </div>
        </div>
        <div styleName="container">
          <div styleName="content">
            {
              data.firstGroup.map(this.renderContentRow)
            }
            <div styleName="hr"></div>
            {
              data.secondGroup.map(this.renderContentRow)
            }
          </div>
        </div>
      </div>
    )
  }
}
