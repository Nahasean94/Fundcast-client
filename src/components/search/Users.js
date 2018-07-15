import React from 'react'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {searchUsers} from "../../shared/queries"
import shortid from "shortid"
import {Consumer, Query} from "graphql-react"
import SearchTerm from './SearchTerm'


class Hosts extends React.Component {
    render() {
        return (<Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            variables={{
                search: SearchTerm.getSearchTerm(),
            }}
            query={searchUsers}

        >
            {({loading, data}) => {
                if (data) {
                    if (data.searchUsers.length > 0) {
                        console.log("searched")
                        return <div className="container">
                            <div className="row">
                                {data.searchUsers.map(user => {

                                    const userPage = `/hosts/${user.id}`
                                    return (
                                        <div key={shortid.generate()}>
                                            <div className="col-sm-2">
                                                <div className="">
                                                    <a href={userPage}> <img
                                                        src={`http://localhost:8080/uploads/${user.profile_picture}`}
                                                        width="150" height="100"
                                                        alt={user.username} className="rounded"/></a>
                                                    <a href={userPage}><h6>{user.username}</h6></a>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                                } </div>
                        </div>

                    } else {
                        return <p>No Users found</p>
                    }
                }
                else if (loading) {
                    return <p>Searching…</p>
                }
                return <p>Searching failed.</p>
            }
            }
        </Query>)
    }
}

export default Hosts
