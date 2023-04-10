export interface Video {
  Caption: string
  Video: {
    asset: {
      _id: string
      url: string
    }
  }
  _id: string
  PostedBy: {
    _id: string
    UserName: string
    Image: string
  }
  Likes: {
    PostedBy: {
      _id: string
      UserName: string
      Image: string
    }
  }[]
  Saves: {
    _key: string
    PostedBy: {
      _id: string
      UserName: string
      Image: string
    }
  }[]
  Comments: {
    Comment: string
    _key: string
    PostedBy: {
      _ref: string
    }
  }[]
  UserID: string
}

export interface IUser {
  _id: string
  _type: string
  UserName: string
  Image: string
}
