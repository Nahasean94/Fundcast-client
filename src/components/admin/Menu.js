import React from 'react'
import {Nav, NavItem, NavLink} from "reactstrap"


export default ({router, active}) => {
    const onCaseFormsLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/dashboard/listeners")
}
    const onCaseCategoriesLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/dashboard/hosts")
    }
    const onCaseTypeLink= (e) => {
        e.preventDefault()
        router.history.push("/admin/dashboard/faqs")

    }
    const onCourtStationsLink = (e) => {
        e.preventDefault()
        router.history.push("/admin/dashboard/about")
    }

    return <Nav pills vertical  className="bd-links" id="bd-docs-nav">
        <NavItem>
            <NavLink href="" onClick={onCourtStationsLink} active={active === 'court-station'}>Court Stations</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onCaseFormsLink} active={active === 'case-forms'}>Case Forms</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onCaseCategoriesLink} active={active === 'case-categories'}>Case categories</NavLink>
        </NavItem>
        <NavItem>
            <NavLink href="" onClick={onCaseTypeLink} active={active === 'case-types'}>Case types</NavLink>
        </NavItem>


    </Nav>


}
