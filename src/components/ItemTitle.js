import React from "react";

class ItemTitle extends React.Component {
  render() {
    return <div className="item-title">{this.props.title}</div>;
  }
}

export default ItemTitle;
