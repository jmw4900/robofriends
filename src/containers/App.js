import React, { Component } from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
import "./App.css";

import { setSearchField, requestRobots } from "../actions";

// what state, what piece state I need to listen to and send down as props
// state values
const mapStateToProps = state => {
  return {
    // if we get more reducers we're going to have to get state from each piece that we're interested in
    // States from reducer
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  };
};

// what props I should listen to that are actions
// events
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: event => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  };
};

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = {
  //     robots: []
  //   };
  // }

  componentDidMount() {
    // fetch("https://jsonplaceholder.typicode.com/users")
    //   .then(response => response.json())
    //   .then(users => this.setState({ robots: users }));
    this.props.onRequestRobots();
  }

  // onSearchChange = event => {
  //   this.setState({ searchfield: event.target.value });
  // };

  render() {
    // const { robots, searchfield } = this.state;
    // const { robots } = this.state;
    // These two parts come down as props
    const { searchField, onSearchChange, robots, isPending } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    });
    return isPending ? (
      <h1 className="tc">Loading...</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filteredRobots} />
          </ErrorBoundry>
        </Scroll>
      </div>
    );
  }
}

// It gives 2 parameters to App as props
export default connect(mapStateToProps, mapDispatchToProps)(App);
