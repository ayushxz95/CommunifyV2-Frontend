export interface IUser {
  _id: string,
  username: string,
  email: string,
  password: string,
  profilePicture: string,
  about: string,
  createdAt: number,
  updatedAt: number,
}

export interface ISignInResponseData {
  accessToken: string,
  refreshToken: string,
  user: IUser,
}

export interface ISignInAndSignUpResponse {
  data: ISignInResponseData,
  success: boolean,
}

export interface IAnswer {
  id: string,
  content: string,
  postId: string,
  authorId: string,
  images: Array<string>,
  createdAt: Number,
  updatedAt: Number,
  likes: Number,
  comments: Number,
}

export interface IComment {
  id: string,
  answerId: string,
  authorId: string,
  content: string,
  createdAt: Number,
  updatedAt: Number,
}

export interface IPostForCreate {
  title: string,
  description: string,
  authorId: string,
  tags: Array<String>,
}

export interface IPost {
  _id: string,
  title: string,
  description: string,
  authorId: string,
  tags: Array<String>,
  images: Array<String>,
  createdAt: Number,
  updatedAt: Number,
  isSaved: Boolean,
  mostLikedAnswer: IMostLiked
}

export interface IPostWithTags {
  _id: string,
  title: string,
  description: string,
  authorId: string,
  createdAt: string,
  updatedAt: string,
  tags: Array<String>,
}

export interface IMostLiked {
  isLiked: Boolean,
}