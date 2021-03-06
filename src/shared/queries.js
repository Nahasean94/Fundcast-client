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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}

}
    }
    }
`
const searchPodcasts = `
   query($search:String!) {
  searchPodcasts(search:$search) {
        id
title
description
tags
listens
hosts{
id
username
profile_picture
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
timestamp
buyer{
id
username
}
}
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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
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
ethereum_address
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
  subscribers{
  id
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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
}
    }
    }
`
const addHistory = `
   mutation($podcast_id:ID!) {
  addHistory(podcast_id:$podcast_id) {
     id
title
description
tags
listens
hosts{
id
username
profile_picture
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
}
    }
    }
`
const getHistory = `
   {
  getHistory{
     id
title
description
tags
listens
hosts{
id
username
profile_picture
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
}
    }
    }
`
const addListens = `
   mutation($podcast_id:ID!){
  addListens(podcast_id:$podcast_id){
     id
title
description
tags
listens
hosts{
id
username
profile_picture
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
}
    }
    }
`
const getNotifications = `
   {
  getNotifications{
timestamp
id
podcast{
title
id
coverImage{
path
}
hosts{
username
id
}
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
ethereum_address
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
amount
ethereum_address
buyers{
id
amount
buyer{
id
}
}
}
    }
    }
`
const unlockPodcast = `
   mutation($podcast:ID!,$buyer:ID!,$amount:Int!) {
  unlockPodcast(podcast:$podcast,buyer:$buyer,amount:$amount) {
   id
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
   mutation($id:ID!,$title:String!,$description:String!,$hosts:[String!]!,$paid:Int!,$tags:[String!]!$amount:Int,$ethereum_address:String) {
  updateBasicInfo(id:$id,title:$title,description:$description,hosts:$hosts,paid:$paid,tags:$tags,amount:$amount,ethereum_address:$ethereum_address) {
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
const addBasicInfo = `
   mutation($title:String!,$description:String!,$hosts:[String!]!,$paid:Int!,$tags:[String!]!,$amount:Int,$ethereum_address:String) {
  addBasicInfo(title:$title,description:$description,hosts:$hosts,paid:$paid,tags:$tags,amount:$amount,ethereum_address:$ethereum_address) {
  id
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
const addCoverImageFile = `
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
const addAudioFile = `
   mutation($id:ID!,$podcast:Upload!) {
  addAudioFile(id:$id,podcast:$podcast) {
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
ethereum_address
}
}`
const getHostsSubscriptions = `
query($id:ID!){
getHostsSubscriptions(id:$id){
id
username
profile_picture
}
}`
const getTagsSubscriptions = `
query($id:ID!){
getTagsSubscriptions(id:$id){
id
name
}
}`
const searchHosts = `
query($search:String!){
searchHosts(search:$search){
id
username
profile_picture
}
}`
const searchUsers = `
query($search:String!){
searchUsers(search:$search){
id
username
profile_picture
}
}`
const searchTags = `
query($search:String!){
searchTags(search:$search){
id
podcasts{
id
}
name
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

const subscribeToHost = `
mutation($host:ID!){
subscribeToHost,(host:$host){
subscribers{
id
}
}
}`
const subscribeToTag = `
mutation($tag:ID!){
subscribeToTag,(tag:$tag){
subscribers{
id
}
}
}`
const unSubscribeFromHost = `
mutation($host:ID!){
unSubscribeFromHost(host:$host){
subscribers{
id
}
}
}`
const unSubscribeFromTag = `
mutation($tag:ID!){
unSubscribeFromTag(tag:$tag){
subscribers{
id
}
}
}`
const getTagSubscribers = `
query($tag:ID!){
getTagSubscribers(tag:$tag){
id
name
subscribers{
id
}
}
}`
const adminExists = `
   {
  adminExists{
   exists
  }
}`
const registerAdmin = `
mutation($username:String!,$password:String!){
registerAdmin(username:$username,password:$password){
id
}
}`
const adminLogin = `
   mutation($username:String!,$password:String!) {
  adminLogin(username:$username,password:$password) {
    token
    ok
    error
  }
}
`
const updateAbout = `
   mutation($about:String!){
  updateAbout(about:$about) {
   about
  }
}
`
const newFaq = `
   mutation($question:String!,$answer:String!,){
  newFaq(question:$question,answer:$answer) {
   question
   id
   answer
  }
}
`
const getAbout = `
   {
  getAbout{
    about
  }
}
`
const getFaqs = `
   {
  getFaqs{
      question
   id
   answer
  }
}
`
export {
    podcasts,
    updateAbout,
    getAbout,
    getFaqs,
    newFaq,
    fetchPodcastsByTags,
    podcast,
    hosts,
    tags,
    updateBasicInfo,
    updateCoverImageFile,
    updateAudioFile,
    addBasicInfo,
    addCoverImageFile,
    addAudioFile,
    updateProfileBasicInfo,
    confirmPassword,
    fetchLikedPodcasts,
    searchPodcasts,
    fetchHostPodcasts,
    fetchUserProfile,
    getHostsSubscriptions,
    getTagsSubscriptions,
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
    changePassword,
    uploadProfilePicture,
    person,
    unPublishPodcast,
    publishPodcast,
    addHistory,
    getHistory,
    addListens,
    searchHosts,
    searchTags,
    searchUsers,
    subscribeToHost,
    unSubscribeFromHost,
    subscribeToTag,
    unSubscribeFromTag,
    getTagSubscribers,
    getNotifications,
    unlockPodcast,
    adminExists,
    registerAdmin,
    adminLogin,

}
