import React from 'react'
//import VanillaKinetic from 'vanilla.kinetic/vanilla.kinetic'
import isMobile from 'isMobile'
import addEventListeners from './addEventListeners'
import CSSModules from 'react-css-modules'
import style from './style'

import data from '../../../static/data'


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

  highlightRow = (index) => {
    this.setState({
      hoveredIndex: index
    })
  }

  renderSidebarRow(teamData, index) {
    return (
      <div key={ index } styleName="sidebarRow">
        <div styleName="sidebarRowIndex">{ index + 1 }</div>
        { teamData.name }
      </div>
    )
  }

  renderContentCell(value, index) {
    if (value == '-') {
      value = ''
    }

    return (
      <div key={ index } styleName="cell">{ value }</div>
    )
  }

  renderContentRow(teamData, index) {
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
      <div key={ index } styleName="contentRow" onMouseOver={ () => this.highlightRow(index) }>
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
    const { hoveredIndex } = this.state

    
    return (
      <div styleName="wrapper">

        <div styleName="header">
          <div ref="header" styleName="headerContent">
            {
              Array.apply(null, {length: data.gamesCnt}).map(Number.call, Number).map((item, index) => {
                return (
                  <div key={ index } styleName="cell">{ `Игра ${ index + 1 }` }</div>
                )
              })
            }
            <div styleName="cell cellResult cellRank">Ранг</div>,
            <div styleName="cell cellResult cellRoundCnt">Кол. игр</div>,
            <div styleName="cell cellResult cellSumm">Сумма</div>,
            <div styleName="cell cellResult cellAvg">Среднее</div>,
            <div styleName="cell cellResult cellPercent">%</div>
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
              data.firstGroup.map(this.renderSidebarRow)
            }
            <div styleName="hr"></div>
            {
              data.secondGroup.map(this.renderSidebarRow)
            }
          </div>
        </div>

        <div ref="container" styleName="container">
          <div ref="content" styleName="content">
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
