import DateTimeFormat = Intl.DateTimeFormat;

export interface Message {
    id: number;
    text: string;
    DateSent: Date;
    authorId: number | null;
    chatId: number | null;
    type: Type;
}


export interface Chat {
    id: number;
    users: Array<User> | null;
    messages: Array<Message> | null;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    status: "online";
    friends: Array<User> | null;
    messages: Array<Message>  | null;
    refreshTokens: Array<RefreshToken>;
    accessToken: string;
    createdAt: DateTimeFormat;
    updatedAt: DateTimeFormat;

}

export interface RefreshToken {

    id: number;
    nahashedTokenme: string;
    userId: string;
    user: User;
    revoked: Boolean;
    createdAt: DateTimeFormat;
    updatedAt: DateTimeFormat;

}



export enum Type {
    Private,
    Public
}
