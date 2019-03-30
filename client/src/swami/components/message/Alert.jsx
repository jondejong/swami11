import React from 'react'

import {connect} from 'react-redux'
import {Redirect} from 'react-router'

import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

import {clearMessage, MESSAGE_TYPES} from './message.actions'

const barStyle = {
  backgroundColor: '#FE350A'
}

const closeButtonStyle = {
  title: {
    cursor: 'pointer',
  },
}

class Alert extends React.Component {

  render() {

    const {clearMessage, message, type, visible} = this.props

    if(!visible) {
      return <div></div>
    }

    const closeButton =
      <IconButton style={closeButtonStyle} onClick={clearMessage}>
        <NavigationClose />
      </IconButton>

    const redirect = type === MESSAGE_TYPES.ERROR ?
      (<Redirect to='/login' />) :
      (<div/>)

    return (
      <div>
        {redirect}
        <AppBar
          style={barStyle}
          title={message}
          iconElementLeft={closeButton}
        />
      </div>
    )
  }
}

Alert = connect(
  (state) => {
    return {
      message: state.swamiApp.messageStore.message,
      type: state.swamiApp.messageStore.type,
      visible: state.swamiApp.messageStore.visible
    }
  },
  (dispatch) => {
    return {
      clearMessage: () => {
        dispatch(clearMessage())
      }
    }
  }
)(Alert)

export default Alert