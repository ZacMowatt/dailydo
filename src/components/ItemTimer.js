import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faCheck } from "@fortawesome/free-solid-svg-icons";

class ItemTimer extends React.Component {
  state = { done: false, time: 0 };

  componentDidMount() {
    this.setState({ remaining: this.props.remaining });
    if (this.props.remaining < 1) {
      this.setState({ done: true });
    }
  }

  render() {
    return this.state.done ? (
      <div className="item-timer">
        <div className="time-box text-success">Complete</div>
      </div>
    ) : (
      <div className="item-timer">
        <FontAwesomeIcon
          className="icon text-info"
          icon={faSortDown}
          onClick={this.decrement.bind(this)}
        />
        <div className="time-box">{this.state.remaining}</div>
        <FontAwesomeIcon
          className="icon text-success"
          icon={faCheck}
          onClick={this.done.bind(this)}
        />
      </div>
    );
  }

  decrement = () => {
    var remaining = this.state.remaining;

    if (remaining > 0) remaining -= 1;
    this.setState({ remaining: remaining });

    if (remaining === 0) {
      this.setState({ done: true });
    }

    this.props.updateTime(remaining);
  };

  done = () => {
    this.setState({ done: true, remaining: 0 });
    this.props.updateTime(0);
  };
}

export default ItemTimer;
