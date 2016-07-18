import React from 'react'
import isMobile from 'isMobile'


export default class Root extends React.Component {
  componentDidMount() {
    if (!isMobile) {
      document.body.className = 'not-mobile'
    }
  }

  render() {
    return (
      <div>{ this.props.children }</div>
    )
  }
}
