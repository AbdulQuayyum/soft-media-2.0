export const AllPostsQuery = () => {
  const query = `*[_type == "Post"] | order(_createdAt desc){
    _id,
     Caption,
       Video{
        asset->{
          _id,
          url
        }
      },
      UserID,
      PostedBy->{
        _id,
        UserName,
        Image
      },
    Likes,
    Save[]{
      _key,
      PostedBy->{
        _id,
        UserName,
        Image
      },
    },
    Comments[]{
      Comment,
      _key,
      PostedBy->{
      _id,
      UserName,
      Image
    },
    }
  }`

  return query
};

export const PostDetailQuery = (PostID: string | string[]) => {
  const query = `*[_type == "Post" && _id == '${PostID}']{
    _id,
     Caption,
       Video{
        asset->{
          _id,
          url
        }
      },
      UserID,
    PostedBy->{
      _id,
      UserName,
      Image
    },
     Likes,
     Save[]{
       _key,
       PostedBy->{
         _id,
         UserName,
         Image
       },
     },
    Comments[]{
      Comment,
      _key,
      PostedBy->{
        _ref,
      _id,
    },
    }
  }`
  return query
};

export const SearchPostsQuery = (SearchTerm: string | string[]) => {
  const query = `*[_type == "Post" && Caption match '${SearchTerm}*' || topic match '${SearchTerm}*'] {
    _id,
     Caption,
       Video{
        asset->{
          _id,
          url
        }
      },
      UserID,
    PostedBy->{
      _id,
      UserName,
      Image
    },
Likes,
Save[]{
  _key,
  PostedBy->{
    _id,
    UserName,
    Image
  },
},
    Comments[]{
      Comment,
      _key,
      PostedBy->{
      _id,
      UserName,
      Image
    },
    }
  }`
  return query
};

export const SingleUserQuery = (UserID: string | string[]) => {
  const query = `*[_type == "User" && _id == '${UserID}']`

  return query
};

export const AllUsersQuery = () => {
  const query = `*[_type == "User"]`

  return query
};

export const UserCreatedPostsQuery = (UserID: string | string[]) => {
  const query = `*[ _type == 'Post' && UserID == '${UserID}'] | order(_createdAt desc){
    _id,
     Caption,
       Video{
        asset->{
          _id,
          url
        }
      },
      UserID,
    PostedBy->{
      _id,
      UserName,
      Image
    },
 Likes,
 Save[]{
   _key,
   PostedBy->{
     _id,
     UserName,
     Image
   },
 },
    Comments[]{
      Comment,
      _key,
      PostedBy->{
      _id,
      UserName,
      Image
    },
    }
  }`

  return query
};

export const UserLikedPostsQuery = (UserID: string | string[]) => {
  const query = `*[_type == 'Post' && '${UserID}' in Likes[]._ref ] | order(_createdAt desc) {
    _id,
     Caption,
       Video{
        asset->{
          _id,
          url
        }
      },
      UserID,
    PostedBy->{
      _id,
      UserName,
      Image
    },
 Likes,
 Save[]{
   _key,
   PostedBy->{
     _id,
     UserName,
     Image
   },
 },
    Comments[]{
      Comment,
      _key,
      PostedBy->{
      _id,
      UserName,
      Image
    },
    }
  }`

  return query
};

export const TopicPostsQuery = (Topic: string | string[]) => {
  const query = `*[_type == "Post" && Topic match '${Topic}*'] {
    _id,
     Caption,
       Video{
        asset->{
          _id,
          url
        }
      },
      UserID,
    PostedBy->{
      _id,
      UserName,
      Image
    },
 Likes,
 Save[]{
   _key,
   PostedBy->{
     _id,
     UserName,
     Image
   },
 },
    Comments[]{
      Comment,
      _key,
      PostedBy->{
      _id,
      UserName,
      Image
    },
    }
  }`

  return query
};
