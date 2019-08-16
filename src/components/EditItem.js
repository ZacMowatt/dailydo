import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faMinus } from "@fortawesome/free-solid-svg-icons";

class EditItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: "", time: "" } };
  }

  componentDidMount() {
    this.setState({ item: this.props.item });
  }

  render() {
    return (
      <div className="item new-item">
        <input
          type="text"
          id="task-input"
          value={this.state.item.title}
          onChange={this.titleChanged.bind(this)}
          autoComplete="off"
        />
        <input
          type="number"
          id="time-input"
          value={this.state.item.time}
          onChange={this.timeChanged.bind(this)}
        />
        <button
          className="btn btn-danger"
          onClick={() => this.props.remove(this.state.item)}
        >
          Remove
        </button>
      </div>
    );
  }

  update = () => {
    this.props.updateItem(this.state.item);
  };

  titleChanged = event => {
    console.log("Changed");
    var title = event.target.value;
    var item = this.state.item;
    item.title = title;
    this.setState({ item: item });
  };

  timeChanged = event => {
    var time = event.target.value;
    var item = this.state.item;
    if (item.time === item.remaining || item.remaining > time)
      item.remaining = time;
    item.time = time;
    this.setState({ item: item });
  };
}

export default EditItem;
