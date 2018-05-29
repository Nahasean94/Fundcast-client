import React, { Component } from 'react';
import NavigationBar from './NavigationBar'
import FlashMessageList from './flash/flashMessagesList'
class App extends Component {
  render() {
    return (
        <div className="container-fluid">
            <NavigationBar/>
            <FlashMessageList/>
            {this.props.children}
        </div>
    );
  }
}

export default App
