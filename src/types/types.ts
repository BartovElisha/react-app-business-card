export interface IUserData {
    name: string;
    email: string;
    password: string;
    izBiz: boolean;
}

export interface IError {
    [key: string]: string;
}