import React, { Component } from 'react'
import ItemTypes from "./ItemTypes.js"
import { DragSource } from 'react-dnd'

const styles = {
  fontSize: 25,
  fontWeight: 'bold',
  cursor: 'move',
  display: "inline-block",
  padding: "5px",
  border: "solid",
}

class MinerMK1 extends Component {
  render() {
    const { left, top, position } = this.props;
    return this.props.connectDragSource(
      <div style={Object.assign({}, styles, { left, top, position, opacity: this.props.isDragging ? 0.5 : 1 })}>
        <img src="assets/minermk1.png" alt="Miner MK1"></img>
      </div>,
    )
  }
}

const minermk1Source = {
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

export default DragSource(ItemTypes.MINERMK1, minermk1Source, collect)(MinerMK1);
