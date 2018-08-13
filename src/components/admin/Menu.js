import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"


export default ({router, active}) => {
    const onUsersLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/listeners")
    }

    const onFaqsLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/faqs")
    }
    const onAboutLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/about")
    }

    return <Nav pills vertical className="bd-links" id="bd-docs-nav">
        {/*<NavItem>*/}
            {/*<NavLink href="" onClick={onUsersLink} active={active === 'users'}>Users</NavLink>*/}
        {/*</NavItem>*/}
        <NavItem>
            <NavLink href="" onClick={onFaqsLink} active={active === 'faqs'}>FAQs</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onAboutLink} active={active === 'about'}>About</NavLink>
        </NavItem>

    </Nav>


}
