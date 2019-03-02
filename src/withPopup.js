import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Popup from './modal';

function withPopup(WrappedComponent) {
  return class extends Component {
    state = {
      displayPopup: false
    }

    toggleDisplay = (e) => {
      console.log(e);
      this.setState(state => ({
        displayPopup: !state.displayPopup,
      }));
    }

    render() {
      console.log('popup staut', this.state.displayPopup)
      return (
        <div>
          {this.state.displayPopup &&
            <Popup togglePopup={(e) => this.toggleDisplay(e)}/>}
          <WrappedComponent
            togglePopup={(e) => this.toggleDisplay(e)}
            {...this.props}/>
        </div>
      )
    }
  }
}

export default withPopup;
