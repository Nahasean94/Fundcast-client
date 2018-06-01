// import React from 'react'
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
// import PropTypes from 'prop-types'
// import {logout} from '../actions/loginActions'
// import jwt from "jsonwebtoken"
// class NavigationBar extends React.Component {
//     constructor(props){
//         super(props)
//         this.logout=this.logout.bind(this)
//     }
//     logout(e){
//         e.preventDefault()
//         this.props.logout()
//         this.context.router.history.push('/')
//     }
//
//     render() {
//         const {isAuthenticated} = this.props.loginReducers
//         const token = jwt.decode(localStorage.jwtToken)
//         const userLinks = ( <div className="navbar-nav flex-row ml-md-auto">
//             <a href="/logout" className="nav-item nav-link" onClick={this.logout}>Logout </a>
//             {token && <Link to="/profile" className="nav-item nav-link">{token.username}</Link>}
//         </div>)
//
//         const guestLinks = (
//             <div className="navbar-nav flex-row ml-md-auto">
//                 <Link className="nav-item nav-link" to="/signin">Sign in</Link>
//             </div>)
//         return (
//
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <Link to="/" className="navbar-brand">Twinpal</Link>
//             <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
//                     aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//                 <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//                 {isAuthenticated ? userLinks : guestLinks}
//             </div>
//         </nav>
//         )
//     }
// }
// NavigationBar.propTypes = {
//     loginReducers: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired
// }
// NavigationBar.contextTypes={
//     router:PropTypes.object.isRequired
// }
// function mapStateToProps(state) {
//     return {
//         loginReducers: state.loginReducers
//     }
// }
// export default connect(mapStateToProps,{logout})(NavigationBar)
import React from 'react'
import {Link} from 'react-router-dom'
// import {connect} from 'react-redux'
import PropTypes from 'prop-types'
// import {logout} from '../actions/loginActions'
import jwt from "jsonwebtoken"

class NavigationBar extends React.Component {
    constructor(props) {
        super(props)

        this.logout = this.logout.bind(this)

    }

    logout(e) {
        e.preventDefault()
        window.location.reload()
        localStorage.removeItem('Twinpal')
        this.context.router.history.push('/signin')
    }

    render() {
        let isAuthenticated = false
        let token
        if (localStorage.getItem('Twinpal')) {
            token = jwt.decode(localStorage.getItem('Twinpal'))
            isAuthenticated=true
        }
        const userLinks = (<div className="navbar-nav flex-row ml-md-auto">
            <a href="/logout" className="nav-item nav-link" onClick={this.logout}>Logout </a>
            {token && <Link to="/profile" className="nav-item nav-link">{token.username}</Link>}
        </div>)

        const guestLinks = (
            <div className="navbar-nav flex-row ml-md-auto">
                <Link className="nav-item nav-link" to="/signin">Sign in</Link>
            </div>)
        return (

            <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top" id="navigation-bar">
                <Link to="/" className="navbar-brand">Twinpal</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    {isAuthenticated ? userLinks : guestLinks}
                </div>
            </header>
        )
    }
}

// NavigationBar.propTypes = {
//     loginReducers: PropTypes.object.isRequired,
//     logout: PropTypes.func.isRequired
// }
NavigationBar.contextTypes = {
    router: PropTypes.object.isRequired
}
//
// function mapStateToProps(state) {
//     return {
//         loginReducers: state.loginReducers
//     }
// }

// export default connect(mapStateToProps,{logout})(NavigationBar)
export default NavigationBar
