export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    friends: Array<User> | null;
    messages: Array<Message>  | null;
}

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


export enum Type {
    Private,
    Public
}