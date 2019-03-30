import React, { Component } from 'react'
import ItemTypes from "./ItemTypes.js"
import { DragSource } from 'react-dnd'

const styles = {
  position: 'absolute',
  fontSize: 25,
  fontWeight: 'bold',
  cursor: 'move',
  display: "inline-block",
  padding: "5px",
  border: "solid",
}

class Constructor extends Component {
  constructor() {
    super(...arguments);
  }
  render() {
    const { left, top } = this.props;
    console.log(left + ", " + top);
    return this.props.connectDragSource(
      <div style={Object.assign({}, styles, { left, top, opacity: this.props.isDragging ? 0.5 : 1 })}>
        <img src="http://satisfactory-planner.epizy.com/Items/Screw.png"></img>
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
