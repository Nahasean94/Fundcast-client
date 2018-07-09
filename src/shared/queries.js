const podcasts = `
    {
  podcasts {
        id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}
    }
    }
`
const fetchLikedPodcasts = `
   query($id:ID!) {
  fetchLikedPodcasts(id:$id) {
        id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}
    }
    }
`
const fetchPodcastsByTags = `
   query($id:ID!) {
  fetchPodcastsByTags(id:$id) {
        id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}
    }
    }
`
const podcast = `
 query podcast($id:ID!){
  podcast(id:$id) {
        id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
audioFile{
path
}
payment{
paid
}
publishing
    }
    }
`

const fetchProfilePodcasts = `
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
const getProfileInfo = `
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
const fetchHostPodcasts = `
   query fetchHostPodcasts($id:ID!){
  fetchHostPodcasts(id:$id) {
  id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
payment{
paid
}
publishing
  }
}
`
const fetchUserProfile = `
    query fetchUserProfile($id:ID!)   {
  fetchUserProfile(id:$id) {
  id
  username
  email
  role
  profile_picture
  date_joined
  ethereum_address
  liked_podcasts{
   id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
  }
  }
}
`
const login = `
   mutation($email:String!,$password:String!) {
  login(email:$email,password:$password) {
    token
    ok
    error
  }
}
`
const signup = `
   mutation($username:String!,$email:String!,$password:String!,$role:String!) {
  signup(username:$username,email:$email,password:$password,role:$role) {
   id
  }
}
`
const isUserExists = `
   mutation($email:String!) {
  isUserExists(email:$email) {
   exists
  }
}
`
const uploadProfilePicture = `
   mutation($file:Upload!) {
  uploadProfilePicture(file:$file) {
   id
  username
  email
  role
  profile_picture
  date_joined
  ethereum_address
  }
}
`
const likePodcast = `
   mutation($id:ID!) {
  likePodcast(id:$id) {
     id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
audioFile{
path
}
payment{
paid
}
    }
    }
`
const unlikePodcast = `
   mutation($id:ID!) {
  unlikePodcast(id:$id) {
   id
title
description
tags
listens
hosts{
id
username
profile_picture
}
likes{
id
person{
id
}
}
timestamp
coverImage{
path
}
audioFile{
path
}
payment{
paid
}
    }
    }
`
const updatePodcast = `
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
const deletePodcast = `
   mutation($id:ID!) {
  deletePodcast(id:$id) {
   id
  }
}
`
const unPublishPodcast = `
   mutation($id:ID!) {
  unPublishPodcast(id:$id) {
   id
  }
}
`
const confirmPassword = `
    query($password:String!){
  confirmPassword(password:$password) {
   confirmed
  }
}
`
const changePassword = `
    mutation($password:String!){
  changePassword(password:$password) {
   confirmed
  }
}
`
const publishPodcast = `
   mutation($id:ID!) {
  publishPodcast(id:$id) {
   id
  }
}
`
const addComment = `
   mutation($podcast_id:ID!,$comment:String!) {
  addComment(podcast_id:$podcast_id,comment:$comment) {
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
`
const findPodcastComments = `
   query($podcast_id:ID!)  {
  findPodcastComments(podcast_id:$podcast_id) {
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
`
const updateProfile = `
   mutation($first_name:String!,$username:String!,$username:String,$email:String!,$role:String!) {
  updateProfile(first_name:$first_name,username:$username,username:$username,email:$email,role:$role) {
   id
  }
}
`
const uploadFile = `
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
const createNewPodcast = `
   mutation($title:String!,$description:String!,$hosts:[String!]!,$paid:Int!,$tags:[String!]!,$coverImage:Upload!,$podcast:Upload!) {
  newPodcast(title:$title,description:$description,hosts:$hosts,paid:$paid,tags:$tags,coverImage:$coverImage,podcast:$podcast) {
 title
 description
 hosts{
 id
 }
 payment{
 id
 }
 tags

 timestamp
  }
}
`
const updateBasicInfo = `
   mutation($id:ID!,$title:String!,$description:String!,$hosts:[String!]!,$paid:Int!,$tags:[String!]!) {
  updateBasicInfo(id:$id,title:$title,description:$description,hosts:$hosts,paid:$paid,tags:$tags) {
 title
 description
 hosts{
 id
 }
 payment{
 id
 }
 tags
 timestamp
  }
}
`
const updateProfileBasicInfo = `
   mutation($id:ID!,$username:String!,$email:String!,$role:String!,$ethereum_address:String) {
  updateProfileBasicInfo(id:$id,username:$username,email:$email,role:$role,ethereum_address:$ethereum_address) {
 id
  username
  email
  role
  profile_picture
  date_joined
  ethereum_address
  }
}
`
const updateCoverImageFile = `
   mutation($id:ID!,$coverImage:Upload!) {
  updateCoverImageFile(id:$id,coverImage:$coverImage) {
 title
 description
 hosts{
 id
 }
 payment{
 id
 }
 tags
 timestamp
  }
}
`
const updateAudioFile = `
   mutation($id:ID!,$podcast:Upload!) {
  updateAudioFile(id:$id,podcast:$podcast) {
 title
 description
 hosts{
 id
 }
 payment{
 id
 }
 tags
 timestamp
  }
}
`
const tags = `
{
tags{
id
name
}
}`
const hosts = `
{
hosts{
id
username
profile_picture
}
}`
const searchHosts = `
query($username:String!){
searchHosts(username:$username){
id
username
profile_picture
}
}`
const person = `
query($id:ID!){
person(id:$id){
username
email
role
profile_picture
date_joined
ethereum_address
}
}`

export {
    podcasts,
    fetchPodcastsByTags,
    podcast,
    hosts,
    tags,
    updateBasicInfo,
    updateCoverImageFile,
    updateAudioFile,
    updateProfileBasicInfo,
    confirmPassword,
    fetchLikedPodcasts,
    searchHosts,
    fetchProfilePodcasts,
    fetchHostPodcasts,
    fetchUserProfile,
    getProfileInfo,
    signup,
    isUserExists,
    login,
    findPodcastComments,
    likePodcast,
    unlikePodcast,
    updatePodcast,
    deletePodcast,
    addComment,
    updateProfile,
    createNewPodcast,
    changePassword,
    uploadProfilePicture,
    person,
    unPublishPodcast,
    publishPodcast
}
