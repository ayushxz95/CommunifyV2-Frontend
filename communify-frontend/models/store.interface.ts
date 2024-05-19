import { IAnswer, IComment, IPost, IUser } from ".";

interface IAuthStore {
    user: IUser | null;
    accessToken: string | null;
    refreshToken: string | null;
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
}

interface IUserStore {
    user?: IUser | null;
    users: IUser[];
    loading: boolean;
    error: string | null;
}

interface IUploadStore {
    loading: boolean;
    error: string | null;
    imageUrl: string | null;
    fileName: string | null;
}

export interface IStore {
    upload: IUploadStore,
    auth: IAuthStore,

    answer: IAnswerStore,

    comment: ICommentStore,

    post: IPostStore,

    user: IUserStore,

}