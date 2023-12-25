import { Document, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  name: string;
  surName: string;
  password: string;
  _roleId: string;
  isActive: boolean;
  lastLogin: Date;
}

export interface IRole extends Document {
  name: string;
  permission: {
    [key: string]: boolean;
  };
}

export interface IMessage {
  message: string;
}

export interface ICredentials {
  email: string;
  password: string;
}

export interface ITokenPayload {
  _id: Types.ObjectId;
}

export interface ITokensPair {
  userId?: Types.ObjectId;
  name: string;
}

export interface IJwt {
  accessToken: string;
  refreshToken: string;
}

export interface IToken extends IJwt, Document {
  _id: ITokenPayload;
  _userId?: Types.ObjectId | IUser;
}

export interface IActivated extends Document {
  _id: ITokenPayload;
  accessToken: string;
  userEmail: string;
  tokenType: string;
}
