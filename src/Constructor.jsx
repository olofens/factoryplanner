import React, { Component } from 'react'
import ItemTypes from "./ItemTypes.js"
import { DragSource } from 'react-dnd'

const styles = {
  position: 'relative',
  fontSize: 25,
  fontWeight: 'bold',
  cursor: 'move',
  display: "inline-block",
  padding: "5px",
  border: "solid",
  left: 0,
  top: 0,
}

class Constructor extends Component {
  render() {
    const { left, top } = this.props;
    console.log(left + ", " + top);
    return this.props.connectDragSource(
      <div style={Object.assign({}, styles, { left, top, opacity: this.props.isDragging ? 0.5 : 1 })}>
        <img src="/assets/constructor.png" alt="Constructor"></img>
      </div>,
    )
  }
}

const constructorSource = {
  beginDrag(props) {
    const { id, left, top } = props
    return { id, left, top }
  },
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }
}

export default DragSource(ItemTypes.CONSTRUCTOR, constructorSource, collect)(Constructor);
