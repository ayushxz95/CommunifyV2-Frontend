import { IAnswer, IComment, IPost, IUser } from ".";

interface IAuthStore {
    user?: IUser;
    accessToken: string;
    refreshToken: string;
    loading: boolean;
    error: string | null;
}

interface IAnswerStore {
    answers: IAnswer[];
    loading: boolean;
    error: string | null;
}

interface ICommentStore {
    comments: IComment[];
    loading: boolean;
    error: string | null;
}

interface IPostStore {
    posts: IPost[];
    loading: boolean;
    error: string | null;
    title: string;
    tags: [];
}

interface IUserStore {
    user?: IUser;
    users: IUser[];
    loading: boolean;
    error: string | null;
}

interface IUploadStore {
    loading: boolean;
    error: string | null;
    imageUrl: string;
    fileName: string;
}

export interface IStore {
    upload: IUploadStore,
    auth: IAuthStore,

    answer: IAnswerStore,

    comment: ICommentStore,

    post: IPostStore,

    user: IUserStore,

}