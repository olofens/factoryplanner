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
}

class Smelter extends Component {
  render() {
    const { left, top } = this.props;
    return this.props.connectDragSource(
      <div style={Object.assign({}, styles, { left, top, opacity: this.props.isDragging ? 0.5 : 1 })}>
        <img src="assets/smelter.png"></img>
      </div>,
    )
  }
}

const smelterSource = {
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

export default DragSource(ItemTypes.SMELTER, smelterSource, collect)(Smelter);
