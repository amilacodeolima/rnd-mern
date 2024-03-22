import React, { Component } from 'react'

export default class Header extends Component {
  render() {
    return (
      <div>App Name : {this.props.appName}</div>
    )
  }
}