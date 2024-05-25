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

export interface IPost {
  id: string,
  title: string,
  description: string,
  authorId: string,
  tags: Array<String>,
  images: Array<String>,
  createdAt: Number,
  updatedAt: Number,
}

export interface IPostForCreate {
  title: string,
  description: string,
  authorId: string,
  tags: Array<String>,
}