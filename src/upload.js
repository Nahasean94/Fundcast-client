import {Component} from "react"

class Uploader extends Component {
    state = {}

    handleChange = ({
                        target: {
                            validity,
                            files: [file]
                        }
                    }) => {
        if (validity.valid) {
            this.setState({ loading: true })
            this.props.graphql
                .query({
                    fetchOptionsOverride,
                    resetOnLoad: true,
                    variables: { file },
                    query: `
            mutation($file: Upload!) {
              singleUpload(file: $file)
            }
          `
                })
                .request.then(({ data }) =>
                this.setState({
                    loading: false,
                    message: data
                        ? `File ID ${data.singleUpload} uploaded.`
                        : 'Upload failed.'
                })
            )
        }
    }

    render() {
        return (
            <form>
                <input type="file" required onChange={this.handleChange} />
                {this.state.loading && <p>Loading…</p>}
                {this.state.message && <p>{this.state.message}</p>}
            </form>
        )
    }
}






























// import gql from 'graphql-tag'
// import { graphql } from 'react-apollo'
// import React from 'react'
// export default graphql(gql`
//   mutation($file: Upload!) {
//     uploadFile(file: $file)
//   }
// `)(({ mutate }) => (
//         <input
//         type="file"
//         required
//         onChange={({ target: { validity, files: [file] } }) =>{
//             console.log(file)
//             validity.valid && mutate({ variables: { file } })
//         }
//         }
//     />
// ))
// import React from 'react';
// import gql from 'graphql-tag';
// import { graphql, Mutation } from 'react-apollo';
//
// const UPDATE_PROFILE_PICTURE = gql`
//   mutation uploadFile($file: Upload!) {
//     uploadFile(file: $file) {
//       id
//     }
//   }
// `;

// const Upload = () => {
//     let input;
//
//     return (
//         <Mutation mutation={UPDATE_PROFILE_PICTURE}>
//             {uploadFile => (
//                 <div>
//                     <form
//                         onSubmit={e => {
//                             e.preventDefault();
//                             uploadFile({ variables: { file: input.files[0] } });
//                             input.value = '';
//                         }}
//                     >
//                         <input
//                             type="file"
//                             required
//                             ref={node => {
//                                 input = node;
//                             }}
//                         />
//                         <button type="submit">Update Profile Picture</button>
//                     </form>
//                 </div>
//             )}
//         </Mutation>
//     );
// };
//
// export default Upload;