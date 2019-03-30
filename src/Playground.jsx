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
      items: {
        a: { top: 0, left: 0 },
        b: { top: 400, left: 400 },
      }
    }
  }
  render() {
    const { hideSourceOnDrag, connectDropTarget } = this.props
    const { items } = this.state;
    return connectDropTarget(
      <div style={styles}>
        {Object.keys(items).map(key => {
          const { left, top } = items[key]
          return (
            <Constructor
              key={key}
              id={key}
              left={left}
              top={top}
              hideSourceOnDrag={hideSourceOnDrag}
            />
          )
        })}
      </div>
    );
  }

  moveItem(id, left, top) {
    this.setState(
      update(this.state, {
        items: {
          [id]: {
            $merge: { left, top },
          },
        },
      }),
    )
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
      const delta = monitor.getDifferenceFromInitialOffset()
      const left = Math.round(item.left + delta.x)
      const top = Math.round(item.top + delta.y)
      component.moveItem(item.id, left, top)
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(Playground)
