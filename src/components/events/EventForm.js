import React from 'react'
import TextFieldGroup from "../../shared/TextFieldsGroup"
import {connect} from 'react-redux'
import {createEvent} from '../../actions/eventActions'
import PropTypes from 'prop-types'
class EventForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            errors: {},
            isLoading: false,
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)}




    onSubmit(e) {
        e.preventDefault()
this.props.createEvent(this.state)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
            const {errors,title,isLoading}=this.state
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Create new Game Event</h1>
                {errors.form && <div className="alert alert-danger">{errors.form}</div>}
                <TextFieldGroup
                    label="Event name"
                    type="title"
                    name="title"
                    value={title}
                    onChange={this.onChange}
                    error={errors.title}

                />

                <div className="form-group">
                    <button disabled={isLoading} className="btn btn-primary btn-sm"
                            type="submit">Sign up
                    </button>
                </div>
            </form>
        )
    }
}
//
EventForm.propTypes = {
    createEvent: PropTypes.func.isRequired
}
// EventForm.contextTypes = {
//     router: PropTypes.object.isRequired
// }

export default connect(null,{createEvent})(EventForm)