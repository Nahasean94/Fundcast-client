const fetchNewsFeed =`
    {
  fetchNewsFeed {
  id
        timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
    }
    }
`

const fetchProfilePosts =`
    {
  fetchProfilePosts {
  id
     timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const getProfileInfo =`
    {
  getProfileInfo {
   username
   birthday
   email
   first_name
   last_name
   profile_picture
   twinpals {
   profile_picture
   id
   username
   }
  }
}
`
const fetchPalPosts =`
   query fetchPalPosts($id:ID!){
  fetchPalPosts(id:$id) {
  id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const fetchPalProfile =`
    query fetchPalProfile($id:ID!)   {
  fetchPalProfile(id:$id) {
            id
            username
            birthday
            profile_picture
  }
}
`
const login =`
   mutation($email:String!,$password:String!) {
  login(email:$email,password:$password) {
    token
    ok
    error
  }
}
`
const signup =`
   mutation($first_name:String!,$last_name:String!,$email:String!,$password:String!,$birthday:String!) {
  signup(first_name:$first_name,last_name:$last_name,email:$email,password:$password,birthday:$birthday) {
   id
  }
}
`
const isUserExists =`
   mutation($email:String!) {
  isUserExists(email:$email) {
   exists
  }
}
`
const uploadProfilePicture =`
   mutation($file:Upload!) {
  uploadProfilePicture(file:$file) {
   uploaded
  }
}
`
const likePost =`
   mutation($id:ID!) {
  likePost(id:$id) {
    id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const unlikePost =`
   mutation($id:ID!) {
  unlikePost(id:$id) {
   id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const updatePost =`
   mutation($id:ID!,$body:String!) {
  updatePost(id:$id,body:$body) {
  id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const deletePost =`
   mutation($id:ID!) {
  deletePost(id:$id) {
   id
  }
}
`
const addComment =`
   mutation($post_id:ID!,$comment:String!) {
  addComment(post_id:$post_id,comment:$comment) {
   id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const updateProfile =`
   mutation($first_name:String!,$last_name:String!,$username:String,$email:String!,$birthday:String!) {
  updateProfile(first_name:$first_name,last_name:$last_name,username:$username,email:$email,birthday:$birthday) {
   id
  }
}
`
const uploadFile =`
   mutation($file:Upload!,$profile:ID!) {
  uploadFile(file:$file,profile:$profile){
  id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`
const createNewPost =`
   mutation($body:String!,$profile:ID!) {
  newPost(body:$body,profile:$profile) {
 id
    timestamp
        scope
        uploads {
          id
          path
          }
        likes {
        person{
        id
        }
          id
          }
        body
        author {
            username
            id
            profile_picture
        }
        profile {
        username
        id
        }
        comments{
        id
        body
        author{
        id
        profile_picture
        username
        }
        timestamp
        }
  }
}
`


export {
    fetchNewsFeed,
    fetchProfilePosts,
    fetchPalPosts,
    fetchPalProfile,
    getProfileInfo,
    signup,
    isUserExists,
    login,
    likePost,
    unlikePost,
    updatePost,
    deletePost,
    addComment,
    updateProfile,
    createNewPost,
    uploadFile,
    uploadProfilePicture
}
