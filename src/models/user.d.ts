export type UserType = {
    id:number;
    username:string;
    userAccount:string;
    avatarUrl?:string;
    gender:number;
    phone:string;
    email:string;
    userStatus:string;
    tags:string[];
    profile?:string;
    createTime:Date;
    userRole:number;
    planetCode:string;
};