export interface IUserData {
    name: string;
    email: string;
    password: string;
    izBiz: boolean;
}

export interface IError {
    [key: string]: string;
}

export interface IBusinessCard {
    _id: number;
    title: string;
    subTitle: string;
    description: string;
    address: string;
    phone: string;
    image: string;
    bizNumber: string;
    user_id: string;
    createdAt: Date;
}