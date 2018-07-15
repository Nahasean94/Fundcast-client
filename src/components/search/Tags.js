import React from 'react'
import {fundcastFetchOptionsOverride} from "../../shared/fetchOverrideOptions"
import {searchTags} from "../../shared/queries"
import shortid from "shortid"
import {Consumer, Query} from "graphql-react"
import SearchTerm from './SearchTerm'
import {Link} from "react-router-dom"


class Tags extends React.Component {
    render() {
        return (<Query
            loadOnMount
            loadOnReset
            fetchOptionsOverride={fundcastFetchOptionsOverride}
            variables={{
                search: SearchTerm.getSearchTerm(),
            }}
            query={searchTags}

        >
            {({loading, data}) => {
                if (data) {
                    if (data.searchTags.length > 0) {
                        console.log("searched")
                        return <div className="container">
                            <div className="row">
                                <ol>
                                    {data.searchTags.map(tag => {

                                        const tagsPage = `/tags/${tag.id}`
                                        return (
                                            <li key={shortid.generate()}><Link to={tagsPage}><h4>{tag.name}</h4></Link></li>
                                        )
                                    })
                                    }
                                </ol>
                            </div>
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

export default Tags
