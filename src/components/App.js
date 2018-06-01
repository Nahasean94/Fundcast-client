import React, {Component} from 'react'
import NavigationBar from './NavigationBar'

// import FlashMessageList from './flash/flashMessagesList'
class App extends Component {
    render() {
        return (
            <div className="container-fluid">
                <NavigationBar/>
                {/*<FlashMessageList/>*/}
                <div id="body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default App
