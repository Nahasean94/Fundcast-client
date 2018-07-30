import React from 'react'
import PropTypes from 'prop-types'
import Select from "react-select"
import {Query} from 'graphql-react'
import {hosts} from "../shared/queries"
import {fundcastFetchOptionsOverride} from "../shared/fetchOverrideOptions"

let options

class TestPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            removeSelected: true,
            disabled: false,
            crazy: false,
            stayOpen: false,
            value: [1],
            rtl: false,
            backspaceRemoves: true,
            multi: true,
            creatable: true,
            options: []

        }
        this.onChange = this.onChange.bind(this)

    }

    onChange(value) {
        this.setState({
            value: value,
        })
    }

    render() {
        return (
            <div className="section">
                <Query
                    loadOnMount
                    loadOnReset
                    fetchOptionsOverride={fundcastFetchOptionsOverride}
                    // variables={{username: input}}
                    query={hosts}
                >
                    {({loading, data}) => {
                        if (data) {
                            options = data.hosts.map(host => {
                                return {
                                    label: <div><img src={`http://localhost:8080/uploads/${host.profile_picture}`}
                                                     width="30" height="20" className="rounded-circle"/>{host.username}
                                    </div>,
                                    value: host.username
                                }
                            })
                            return <Select.Creatable
                                closeOnSelect={true}
                                multi={true}
                                onChange={this.onChange}
                                options={options}
                                placeholder="Select your favourite(s)"
                                removeSelected={true}
                            />
                        }
                        else if (loading) {
                            return <p>Loading…</p>
                        }
                        return <p>Loading failed.</p>
                    }
                    }
                </Query>

            </div>
        )
    }
}

TestPage.propTypes = {
    label: PropTypes.string,
}
// export default TestPageimport React from 'react'
// import PropTypes from 'prop-types'
// import Select from "react-select";
// import styled from 'styled-components';
//
// const FLAVOURS = [
//     {label: <img src={'http://localhost:8080/uploads/default.jpg'} width="50" height="50"
//                   className="rounded-circle"/>, value: 'chocolate'},
//     {label: 'Vanilla', value: 'vanilla'},
//     {label: 'Strawberry', value: 'strawberry'},
//     {label: 'Caramel', value: 'caramel'},
//     {label: 'Cookies and Cream', value: 'cookiescream'},
//     {label: 'Peppermint', value: 'peppermint'},
// ]
//
// const WHY_WOULD_YOU = [
//     {label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true},
// ].concat(FLAVOURS.slice(1))
//
// const MultiSelect = styled(Select)`
// 	&.Select--multi  {
//
// 		.Select-value {
// 			display: inline-flex;
// 			align-items: center;
// 		}
// 	}
//
// 	& .Select-placeholder {
// 		font-size: smaller;
// 	}
// `
//
//
// class TestPage extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             removeSelected: true,
//             disabled: false,
//             crazy: false,
//             stayOpen: false,
//             value: [],
//             rtl: false,
//         }
//         this.handleSelectChange = this.handleSelectChange.bind(this)
//         this.toggleCheckbox = this.toggleCheckbox.bind(this)
//         this.toggleRtl = this.toggleRtl.bind(this)
//     }
//
//     handleSelectChange(value) {
//         console.log('You\'ve selected:', value)
//         this.setState({ value });
//     }
//
//     toggleCheckbox(e) {
//         this.setState({
//             [e.target.name]: e.target.checked,
//         })
//     }
//
//     toggleRtl(e) {
//         let rtl = e.target.checked
//         this.setState({rtl})
//     }
//
//     render() {
//         const {crazy, disabled, stayOpen, value} = this.state
//         const options = crazy ? WHY_WOULD_YOU : FLAVOURS
//         return (
//             <div  className="form-group">
//                 <Select
//                     closeOnSelect={true}
//                     multi
//                     onChange={this.handleSelectChange}
//                     options={options}
//                     placeholder="Select your favourite(s)"
//                     removeSelected={true}
//                     // simpleValue
//                     value={value}
//                 />
//
//
//             </div>
//         )
//     }
// }
//
// TestPage.propTypes = {
//     label: PropTypes.string,
// }
export default TestPage