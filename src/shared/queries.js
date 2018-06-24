const fetchPodcastsFeed =`
    {
  fetchPodcastsFeed {
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

const fetchProfilePodcasts =`
    {
  fetchProfilePodcasts {
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
   role
   email
   first_name
   username
   profile_picture
   twinpals {
   profile_picture
   id
   username
   }
  }
}
`
const fetchPalPodcasts =`
   query fetchPalPodcasts($id:ID!){
  fetchPalPodcasts(id:$id) {
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
            role
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
   mutation($username:String!,$email:String!,$password:String!,$role:String!) {
  signup(username:$username,email:$email,password:$password,role:$role) {
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
const likePodcast =`
   mutation($id:ID!) {
  likePodcast(id:$id) {
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
const unlikePodcast =`
   mutation($id:ID!) {
  unlikePodcast(id:$id) {
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
const updatePodcast =`
   mutation($id:ID!,$body:String!) {
  updatePodcast(id:$id,body:$body) {
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
const deletePodcast =`
   mutation($id:ID!) {
  deletePodcast(id:$id) {
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
   mutation($first_name:String!,$username:String!,$username:String,$email:String!,$role:String!) {
  updateProfile(first_name:$first_name,username:$username,username:$username,email:$email,role:$role) {
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
const createNewPodcast =`
   mutation($title:String!,$description:String!,$hosts:String!,$paid:Boolean!,$genre:String!,$podcast:Upload!,$coverImage:Upload!) {
  newPodcast(title:$title!,description:$description,hosts:$hosts,paid:$paid,genre:$genre,podcast:$podcast,coverImage:$coverImage) {
 title
 description
 hosts
 paid
 genre
 podcast
 coverImage
 timestamp
  }
}
`


export {
    fetchPodcastsFeed,
    fetchProfilePodcasts,
    fetchPalPodcasts,
    fetchPalProfile,
    getProfileInfo,
    signup,
    isUserExists,
    login,
    likePodcast,
    unlikePodcast,
    updatePodcast,
    deletePodcast,
    addComment,
    updateProfile,
    createNewPodcast,
    uploadFile,
    uploadProfilePicture
}
