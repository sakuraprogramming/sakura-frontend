import {UserType} from "./user";

export type TeamType = {
    id: number;
    name: string;
    description: string;
    expireTime?: Date;
    maxNum: number;
    password?: string;
    userId: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoin?: boolean;
    hasJoinNum?: number;
};