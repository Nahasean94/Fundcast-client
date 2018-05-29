import React from 'react'
import SignupPage from "./signup/SignupPage"
import LoginPage from "./login/LoginPage"

export default () => {
    return (
        <div className='row'>
            <div className="col-sm-4">
                <LoginPage/>
            </div>
            <div className="col-sm-4 offset-sm-2">
                <SignupPage/>
            </div>
        </div>
    )
}