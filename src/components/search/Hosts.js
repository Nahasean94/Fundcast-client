import React from 'react'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {searchHosts} from "../../shared/queries"
import shortid from "shortid"
import {Query} from "graphql-react"
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
            query={searchHosts}

        >
            {({loading, data}) => {
                if (data) {
                    if (data.searchHosts.length > 0) {
                        console.log("searched")
                        return <div className="container">
                            <div className="row">
                                {data.searchHosts.map(host => {

                                    const hostPage = `/hosts/${host.id}`
                                    return (
                                        <div key={shortid.generate()}>
                                            <div className="col-sm-2">
                                                <div className="">
                                                    <a href={hostPage}> <img
                                                        src={`http://localhost:8080/uploads/${host.profile_picture}`}
                                                        width="150" height="100"
                                                        alt={host.username} className="rounded"/></a>
                                                    <a href={hostPage}><h6>{host.username}</h6></a>
                                                </div>

                                            </div>
                                        </div>
                                    )
                                })
                                } </div>
                        </div>

                    } else {
                        return <p>No Hosts found</p>
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
