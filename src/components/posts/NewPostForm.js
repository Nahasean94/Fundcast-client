
import React from 'react'
import {createNewPost, uploadFile} from '../../shared/queries'
import * as jwt from "jsonwebtoken"
import UploadPictureModal from "../../modals/UploadPictureModal"
import {twinpalFetchOptionsOverride} from "../../shared/fetchOverrideOptions"

let textarea = {}, upload = null

class NewPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newPost: '',
            showPictureModal: false,
            showSelectFilesModal: false,
            picture: null,
            selectedFile: '',
            loading: false,
            message: '',
        }
        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.onSelectImage = this.onSelectImage.bind(this)
        this.onSelectDialog = this.onSelectDialog.bind(this)
        this.onCloseSelectFilesModal = this.onCloseSelectFilesModal.bind(this)
        this.onClose = this.onClose.bind(this)
    }

    onChange(e) {
        this.setState({newPost: e.target.value})
    }

    onSubmit(e) {
        e.preventDefault()
        const {newPost, selectedFile} = this.state
        if (newPost !== '' || selectedFile !== '') {
            this.setState({loading: true})
            let profile
            if (window.location.pathname === '/profile' || window.location.pathname === '/') {
                const token = jwt.decode(localStorage.getItem('Twinpal'))
                profile = token.id
            } else {
                profile = window.location.pathname.split('/')[2]
            }
            if (selectedFile === '') {
                this.props.graphql
                    .query({
                        fetchOptionsOverride: twinpalFetchOptionsOverride,
                        resetOnLoad: true,
                        operation: {
                            variables: {body: newPost, profile},
                            query: createNewPost
                        }
                    })
                    .request.then(({data}) => {
                        if (data) {
                            this.setState({
                                loading: false,
                                message: data
                                    ? `Posted post.`
                                    : `Posting failed.`
                            })
                        }

                    }
                )
            }
            else if (selectedFile) {
                this.setState({showPictureModal: false})
                this.props.graphql
                    .query({
                        fetchOptionsOverride: twinpalFetchOptionsOverride,
                        resetOnLoad: true,
                        operation: {
                            variables: {file: selectedFile, profile},
                            query: uploadFile
                        }
                    })
                    .request.then(({data}) => {
                        if (data) {
                            this.setState({
                                loading: false,
                                message: data
                                    ? `Posted`
                                    : `Posting failed.`
                            })
                        }

                    }
                )
            }
        }
    }

    onSelectDialog(e) {
        e.preventDefault()
        document.getElementById('myFileInput').click()

    }

    onCloseSelectFilesModal() {
        this.setState({showSelectFilesModal: false})
    }

    onSelectImage(event) {
        event.preventDefault()
        if (event.target.files && event.target.files[0]) {
            this.setState({showPictureModal: true})
            let reader = new FileReader()
            let file = event.target.files[0]
            reader.onload = (e) => {
                this.setState({picture: e.target.result, selectedFile: file})
            }
            reader.readAsDataURL(event.target.files[0])
        }
    }

// handleChange = ({
//                     target: {
//                         validity,
//                         files: [file]
//                     }
//                 }) => {
//     if (validity.valid) {
//         this.setState({ loading: true })
//         this.props.graphql
//             .query({
//                 fetchOptionsOverride,
//                 resetOnLoad: true,
//                 operation: {
//                     variables: { file },
//                     query: `
//   	  mutation($file: Upload!) {
//   	    uploadFile(file: $file) {
// 		  id
// 	    }
// 	  }
//     `
//                 }
//             })
//             .request.then(({ data }) =>
//             this.setState({
//                 loading: false,
//                 message: data
//                     ? `File ID ${data.uploadFile.id} uploaded.`
//                     : 'Upload failed.'
//             })
//         )
//     }
// }
    onClose() {
        this.setState({showPictureModal: false})
    }

    render() {
        const {picture, showPictureModal, loading, message, showSelectFilesModal} = this.state
        return (
            <form encType="multipart/form-data">
                <div className="form-group">
                <textarea name="newPost" onChange={this.onChange} className="form-control" rows="2" cols="20"
                          placeholder="What's Up?" ref={node => {
                    textarea = node
                }}/>
                </div>
                <div className="row">
                    <div className="col-lg-6">
                        <ul className="list-inline">
                            <li className="list-inline-item">
                                <input type="file" id="myFileInput" name="upload" style={{display: 'none'}}
                                       onChange={this.onSelectImage}
                                       accept=".jpg,.gif,.png,.jpeg" ref={node => {
                                    upload = node
                                }}/>
                                <a href="" className="btn btn-default" onClick={this.onSelectDialog}>
                                    <i className="fa fa-picture-o"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-lg-6">
                        <div className="pull-right">
                            <button className="btn btn-primary" onClick={this.onSubmit}>Post
                                Update
                            </button>
                        </div>
                    </div>
                </div>
                {picture !== null &&
                <UploadPictureModal show={showPictureModal} onClose={this.onClose} picture={picture}
                                    onUpload={this.onSubmit}/>}
                {/*<UploadPictureModal show={showPictureModal} onClose={this.onClose} picture={picture}*/}
                {/*onUpload={this.onSubmit}/>*/}
                {/*<SelectFilesModal  show={showSelectFilesModal} onClose={this.onCloseSelectFilesModal}/>*/}
                <div>
                    {loading ? <p>Posting...</p> : ''}
                    {message ? <p>{message}</p> : ''}
                </div>
            </form>
        )
    }
}

// NewPostForm.propTypes = {
//     savePost: PropTypes.func.isRequired,
//     addPost: PropTypes.func.isRequired
// }
// export default connect(null, {savePost, addPost})(NewPostForm)
// export default NewPostForm
export default NewPostForm
// export default compose(graphql(newPost, {name: 'newPost'},))(NewPostForm)
