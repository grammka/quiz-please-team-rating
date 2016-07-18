import React from 'react'
import TeamsList from 'components/TeamsList'
import LineChart from 'chart'
import CSSModules from 'react-css-modules'
import style from './style'
import data from '../../../static/data'


let teamData
let chartData
const chartOptions = {
  responsive: false,
  title: {
    display: true,
    text: 'Кол-во баллов / игры'
  },
  legend: {
    display: false
  },
  tooltips: {
    enabled: false
  },
  elements: {
    line: {
      tension: 0.4,
      backgroundColor: 'rgba(28, 103, 195, 0.23)',
      borderColor: 'rgba(28, 103, 195, 1)',
      borderWidth: 3
    },
    point: {
      radius: 0,
      // backgroundColor: '#fff',
      // borderColor: 'rgba(28, 103, 195, 1)',
      // borderWidth: 3,
      // hoverRadius: 6
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        max: 66,
        min: 0
      }
    }]
  }
}

@CSSModules(style)
export default class Team extends React.Component {
  componentWillMount() {
    this.getTeamData()
  }

  componentWillReceiveProps(nextProps) {
    this.getTeamData()
  }

  getTeamData() {
    const teamName = decodeURIComponent(window.location.href.match(/[^\/]+$/)[0])
    const teamIndex = data.teamNames.indexOf(teamName)

    teamData = data.teams[teamIndex]

    console.debug(teamData.name, teamData);

    const playedGames = teamData.games.map((points, index) => {
      return {
        played: points != '-',
        points,
        num: index + 1
      }
    }).filter((game) => game.played)

    chartData = {
      labels: playedGames.map((game) => game.num),
      datasets: [{
        label: '# of Votes',
        data: playedGames.map((game) => game.points)
      }]
    }
  }


  render() {
    console.log(teamData);


    return (
      <div>
        <div styleName="sidebar">
          <TeamsList />
        </div>
        <div styleName="content">
          <div styleName="name">{ teamData.name }</div>
          <div styleName="info">
            <div styleName="infoItem">
              <span styleName="infoItemLabel">{ 'Сыграно игр:' }</span>
              <span styleName="infoItemValue">{ teamData.playedGamesCnt }</span>
            </div>
            <div styleName="infoItem">
              <span styleName="infoItemLabel">{ 'Сумма баллов:' }</span>
              <span styleName="infoItemValue">{ teamData.sumPoints }</span>
            </div>
            <div styleName="infoItem">
              <span styleName="infoItemLabel">{ 'Средний балл:' }</span>
              <span styleName="infoItemValue">{ teamData.avgPoints }</span>
            </div>
            <div styleName="infoItem">
              <span styleName="infoItemLabel">{ 'Процент победы:' }</span>
              <span styleName="infoItemValue">{ teamData.winPercent }</span>
            </div>
          </div>
          <div>
            <LineChart width={800} height={400} data={ chartData } options={ chartOptions } />
          </div>
        </div>
      </div>
    )
  }
}
