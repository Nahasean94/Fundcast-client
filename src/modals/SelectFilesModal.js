import React from 'react'
import PropTypes from 'prop-types'
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
// import {graphql, Mutation} from 'react-apollo'
import Dropzone from 'react-dropzone'
import gql from 'graphql-tag'

// // import {singleUpload} from '../queries/queries'
// // import {gql} from "apollo-boost/lib/index"
// // import gql from 'graphql-tag'
// // import {graphql} from 'react-apollo'
// const   queries =require('../queries/queries')
// //
// // class SelectPictureModal extends React.Component {
//
//     // constructor(props) {
//     //     super(props)
//     //     this.onDrop = this.onDrop.bind(this)
//     //
//     // }
// const singleUpload =gql`
//   mutation($file: Upload!) {
//     singleUpload(file: $file)
//   }
// `
// export default ({show,onClose})=>{
//
//     // onDrop( acceptedFiles ) {
//     //     acceptedFiles.forEach(file => {
//     //        console.log(file)
//     //         this.props.singleUpload({variables:{file}})
//     //
//     //     });
//     //     // req.end(callback);
//     // }
//     // render() {
//     //     const {show, onClose} = this.props
//
//         if (show) {
//             return (
//                 <Modal isOpen={show} toggle={onClose} size="lg">
//                     <ModalHeader toggle={onClose}>Upload a picture</ModalHeader>
//                     <ModalBody>
//                         <Mutation mutation={ singleUpload}>
//                         {/*{*/}
//                         {/*mutate => (*/}
//                         {/*<Dropzone onDrop={acceptedFiles=>{*/}
//                            {/*return  acceptedFiles.forEach(file => {*/}
//                                 {/*console.log(file)*/}
//                                 {/*return mutate({variables: {file}})*/}
//                             {/*})*/}
//                         {/*}}>*/}
//                         {/*<p>Drag and drop file or click to select</p>*/}
//                         {/*</Dropzone>*/}
//
//                         {/*)*/}
//                         {/*}*/}
//                             {mutate=>{
//
//                                 return  < input
//                                 type="file"
//                                 required
//                                 onChange={({target: {validity, files: [file]}}) =>{
//                                     console.log(file)
//                                     const newFile=file
//                                    return validity.valid && mutate({variables: {file:newFile}
//                                        // , update: (proxy, { data: { singleUpload } }) => {
//                                        //     console.log(file)
//                                        //     const data = proxy.readQuery({ query: queries })
//                                        //     data.uploads.push(singleUpload)
//                                        //     proxy.writeQuery({ query: queries, data })
//                                        // }
//                                 })
//                                 }
//                                 }
//                             />
//                             }}
//                         </Mutation>
//                         {/*<input type="file" required onChange={this.handleChange}/>*/}
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="secondary" onClick={onClose}>Close</Button>{' '}
//                         {/*<Button color="primary" onClick={onUpload}>Upload</Button>{' '}*/}
//                     </ModalFooter>
//                 </Modal>
//             )
//         }
//
//         else
//             return  null
//
//
// }

// SelectPictureModal.propTypes = {
//     show: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     // picture: PropTypes.string.isRequired,
//     // onUpload:PropTypes.func.isRequired,
// }
// export default graphql(singleUpload)(SelectPictureModal)



// export default graphql(gql`
//   mutation($file: Upload!) {
//     singleUpload(file: $file)
//   }
// `)(({show, onClose, mutate}) => {
//         if (show) {
//             return (
//                 <Modal isOpen={show} toggle={onClose} size="lg">
//                     <ModalHeader toggle={onClose}>Upload a picture</ModalHeader>
//                     <ModalBody>
//
//                         < input
//                             type="file"
//                             required
//                             onChange={({target: {validity, files: [file]}}) =>{
//                                return validity.valid && mutate({variables: {file}
//                                    , update: (proxy, { data: { singleUpload } }) => {
//                                        console.log(file)
//                                        const data = proxy.readQuery({ query: queries })
//                                        data.uploads.push(singleUpload)
//                                        proxy.writeQuery({ query: queries, data })
//                                    }})
//                             }
//                             }
//                         />
//                     </ModalBody>
//                     <ModalFooter>
//                         <Button color="secondary" onClick={onClose}>Close</Button>{' '}
//                         {/*<Button color="primary" onClick={onUpload}>Upload</Button>{' '}*/}
//                     </ModalFooter>
//                 </Modal>
//             )
//         }
//
//         else
//             return null
//
//
//     }
// )