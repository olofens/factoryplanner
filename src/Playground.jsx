import React, { Component } from 'react';
import ItemTypes from "./ItemTypes.js";
import { DropTarget } from "react-dnd";
import Constructor from "./Constructor.jsx";
import update from 'immutability-helper';

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

  addItem() {
    var items = [...this.state.items];
    items.push({ top: 0, left: 0 })
    this.setState({ items })
  }
}

export default DropTarget(
  ItemTypes.CONSTRUCTOR,
  {
    drop(props, monitor, component) {
      if (!component) {
        return
      }
      const item = monitor.getItem()
      console.log(item);
      if (item.id === undefined) {
        component.addItem()
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
