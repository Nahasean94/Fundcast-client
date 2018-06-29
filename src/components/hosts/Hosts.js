import React from 'react'
import {Consumer, Query} from 'graphql-react'
import shortid from "shortid"
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {hosts} from "../../shared/queries"


class Hosts extends React.Component {

    render() {

        return (<Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            query={hosts}
        >
            {({loading, data}) => {
                if (data) {
                    if (data.hosts) {
                        return <div className="container">
                            <div className="row">
                                {data.hosts.map(host => {
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
                    }
                }
                else if (loading) {
                    return <p>Loading…</p>
                }
                return <p>Loading failed.</p>
            }

            }
        </Query>)
    }
}

export default Hosts