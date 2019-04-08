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
            position={"absolute"}
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
    console.log("Adding item at top: " + top + ", left: " + left);
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
      
      const item = monitor.getItem()

      if (item.id === undefined) {
        var offset = monitor.getClientOffset()
        const componentRect = findDOMNode(component).getBoundingClientRect()
        var initSourceOffset = monitor.getInitialSourceClientOffset();
        var initOffset = monitor.getInitialClientOffset();

        var xDiff = initOffset.x - initSourceOffset.x;
        var yDiff = initOffset.y - initSourceOffset.y;
        var xPos = offset.x - xDiff + componentRect.x;
        var yPos = offset.y - yDiff - componentRect.y;
        
        component.addItem(yPos, xPos)
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
