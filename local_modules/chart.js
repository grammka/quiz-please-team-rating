import React from 'react'
import ReactDOM from 'react-dom'
import Chart from 'chart.js/src/chart'


export default class LineChart extends React.Component {
  static defaultProps = {
    legend: {
      display: true,
      position: 'bottom'
    },
    type: 'line',
    height: 200,
    width: 200,
    redraw: true
  }

  componentWillMount() {
    this.chart_instance = undefined
  }

  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate() {
    if (this.props.redraw) {
      this.chart_instance.destroy()
      this.renderChart()
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props !== nextProps
  }

  componentWillUnmount() {
    this.chart_instance.destroy()
  }

  renderChart() {
    const { data, options, legend, type } = this.props
    const node = ReactDOM.findDOMNode(this.refs.canvas)

    this.chart_instance = new Chart(node, {
      type,
      data,
      options
    })
  }

  render() {
    const { width, height } = this.props

    return (
      <canvas id="canvas" ref="canvas" width={ width } height={ height } />
    )
  }
}
