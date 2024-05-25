import { IStore } from "../models";

export const INITIAL_APP_STORE: IStore = {
  auth: {
    user: {
      _id: "",
      username: "",
      email: "",
      password: "",
      profilePicture: "",
      about: "",
      createdAt: 0,
      updatedAt: 0
    },
    accessToken: "",
    refreshToken: "",
    loading: false,
    error: null
  },
  user: {
    users: [],
    loading: false,
    error: null
  },
  post: {
    posts: [],
    title: '',
    tags: '',
    loading: false,
    error: null
  },
  answer: {
    answers: [],
    loading: false,
    error: null
  },
  comment: {
    comments: [],
    loading: false,
    error: null
  },
  upload: {
    loading: false,
    error: null,
    imageUrl: "",
    fileName: ""
  }
};
