import React, { Component } from 'react';
import ItemTypes from "./ItemTypes.js";
import { DropTarget } from "react-dnd";
import Constructor from "./Constructor.jsx";
import update from 'immutability-helper';
import { findDOMNode } from 'react-dom';

const styles = {
  width: 800,
  height: 800,
  border: '1px solid black',
  position: 'relative',
}
class Playground extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      items: [

      ]
    }
  }
  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props
    const { items } = this.state;
    return connectDropTarget(
      <div style={styles}>
        {items.map((item, index) => (
          <Constructor
            key={index}
            id={index}
            left={item.left}
            top={item.top}
            hideSourceOnDrag={hideSourceOnDrag}
          />))}
      </div>
    );
  }

  moveItem(id, left, top) {
    console.log(id)
    var items = [...this.state.items];
    items[id].top = top;
    items[id].left = left;
    this.setState({items});
  }

  addItem(top, left) {
    var items = [...this.state.items];
    items.push({ top: top, left: left })
    this.setState({ items })
  }
}

export default DropTarget(
  [ItemTypes.CONSTRUCTOR, 
    ItemTypes.MINERMK1, 
    ItemTypes.SMELTER],
  {
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      console.log(monitor.getClientOffset())
      const item = monitor.getItem()
      console.log(item);
      if (item.id === undefined) {
        var offset = monitor.getClientOffset()
        const componentRect = findDOMNode(component).getBoundingClientRect()
        console.log(componentRect)
        component.addItem(monitor.getClientOffset().y, monitor.getClientOffset().x)
      } else {
        const delta = monitor.getDifferenceFromInitialOffset()
        const left = Math.round(item.left + delta.x)
        const top = Math.round(item.top + delta.y)
        component.moveItem(item.id, left, top)
      }

    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(Playground)
