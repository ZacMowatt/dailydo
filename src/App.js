import React from "react";
import "./App.css";
import Cookies from "universal-cookie";
import Item from "./components/Item";
import NewItem from "./components/NewItem";
import EditItem from "./components/EditItem";

const cookies = new Cookies();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      lastAccess: "",
      editMode: false
    };
  }

  componentDidMount = () => {
    var cookie = cookies.get("items");
    var lastAccessCookie = cookies.get("lastAccess");
    if (cookie) {
      this.setState({ items: cookie });
    }

    this.setState({ lastAccess: lastAccessCookie }, function() {
      this.updateLastAccess();
    });

    /*
    if (this.updateLastAccess(lastAccessCookie)) {
      this.dayReset(cookie);
    }
    */

    //this.updateLastAccess();
  };

  updateLastAccess = () => {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth();
    var year = date.getFullYear();
    var now = day + ":" + month + ":" + year;

    this.checkLastAccess(now);

    this.setState({ lastAccess: now });
    cookies.set("lastAccess", now, { maxAge: 60 * 60 * 24 * 365 * 5 });
  };

  checkLastAccess = now => {
    var lastAccess = this.state.lastAccess;

    if (lastAccess !== now) {
      this.dayReset();
    }
  };

  dayReset = () => {
    console.log("day reset");
    var items = this.state.items;
    console.log(items);

    items.forEach(function(item) {
      item.remaining = item.time;
    });

    this.setState({ items: items });
    cookies.set("items", items, { maxAge: 60 * 60 * 24 * 365 * 5 });
  };

  createItem = item => {
    if (item.title !== "") {
      if (this.state.editMode) {
        return (
          <EditItem
            key={item.id}
            item={item}
            updateItem={this.updateItem}
            remove={this.remove}
          />
        );
      } else {
        return <Item key={item.id} item={item} updateTime={this.updateTime} />;
      }
    }
  };

  render() {
    return (
      <div className="App">
        <h1>Daily Do</h1>
        <div className="list-container">
          {this.state.items.map(this.createItem)}
          {this.state.editMode ? <NewItem add={this.newItem} /> : ""}
        </div>
        <div className="edit" onClick={this.edit.bind(this)}>
          Edit
        </div>
      </div>
    );
  }

  newItem = item => {
    console.log("Adding item: ", item);
    var items = this.state.items;
    items.push(item);

    this.setState({ items: items });
    cookies.set("items", items, { maxAge: 60 * 60 * 24 * 365 * 5 });
  };

  updateTime = toUpdate => {
    var items = this.state.items;
    items.forEach(function(item) {
      if (item.id === toUpdate.id) {
        item.remaining = toUpdate.remaining;
      }
    });
    this.setState({ items: items });
    cookies.set("items", items, { maxAge: 60 * 60 * 24 * 365 * 5 });
  };

  updateItem = toUpdate => {
    console.log("Update item");
    console.log("To update: ", toUpdate);
    console.log("Items: ", this.state.items[0]);
    var items = this.state.items;
    items.forEach(function(item) {
      if (item.id === toUpdate.id) {
        //item.title = toUpdate.title;
        console.log("remaining: " + item.remaining + " time: " + item.time);
        //if (item.remaining >= item.time) item.remaining = toUpdate.time;
        //item.time = toUpdate.time;
      }
    });
    this.setState({ items: items });
    cookies.set("items", items, { maxAge: 60 * 60 * 24 * 365 * 5 });
  };

  edit = () => {
    if (this.state.editMode) {
      this.setState({ editMode: false });
    } else {
      this.setState({ editMode: true });
    }
  };

  remove = toRemove => {
    console.log("Item to remove: ", toRemove);
    var items = this.state.items;
    var index = items.indexOf(toRemove);
    items.splice(index, 1);
    this.setState({ items: items });
    cookies.set("items", items, { maxAge: 60 * 60 * 24 * 365 * 5 });
  };
}

export default App;
