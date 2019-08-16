import React from "react";

class NewItem extends React.Component {
  render() {
    return (
      <div className="item new-item">
        <input type="text" id="new-task-input" placeholder="Task.." />
        <input type="number" id="new-time-input" placeholder="Mins/day.." />
        <button onClick={this.add.bind(this)}>Add</button>
      </div>
    );
  }

  add = () => {
    var title = document.getElementById("new-task-input").value;
    var time = document.getElementById("new-time-input").value;

    document.getElementById("new-task-input").value = "";
    document.getElementById("new-time-input").value = "";

    var id = new Date();
    id = id.getTime();
    this.props.add({ id: id, title: title, time: time, remaining: time });
  };
}

export default NewItem;
