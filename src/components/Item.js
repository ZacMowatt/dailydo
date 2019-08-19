import React from "react";
import ItemTitle from "./ItemTitle";
import ItemTimer from "./ItemTimer";

class Item extends React.Component {
  render() {
    return (
      <div className="item">
        <ItemTitle title={this.props.item.title} />
        <ItemTimer
          remaining={this.props.item.remaining}
          updateTime={this.updateTime}
        />
      </div>
    );
  }

  updateTime = remaining => {
    var item = this.props.item;
    item.remaining = remaining;
    this.props.updateTime(item);
  };
}

export default Item;
