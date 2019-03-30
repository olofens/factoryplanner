import React, { Component } from 'react'
import ItemTypes from "./ItemTypes.js"
import { DragSource } from 'react-dnd'

class Constructor extends Component {
  render() {
    return this.props.connectDragSource(
      <div
        style={{
          opacity: this.props.isDragging ? 0.5 : 1,
          fontSize: 25,
          fontWeight: 'bold',
          cursor: 'move',
        }}
      >
        MyConstructor!
      </div>,
    )
  }
}

const constructorSource = {
  beginDrag(props) {
    return {}
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export default DragSource(ItemTypes.CONSTRUCTOR, constructorSource, collect)(Constructor);
