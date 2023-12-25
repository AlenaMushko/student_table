import { model, Schema, Types } from "mongoose";

import { IUser } from "../../types";

const userSchema = new Schema(
  {
    email: {
      type: String,
      set: (v: string) => v.trim().toLowerCase(),
      unique: true,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
    },
    name: {
      type: String,
      set: (v: string) => v.trim(),
      min: [3, "Name min 3 symbols"],
      max: [30, "Name max 30 symbols"],
      required: [true, "Name is required"],
    },
    surName: {
      type: String,
      set: (v: string) => v.trim(),
      min: [3, "Name min 3 symbols"],
      max: [30, "Name max 30 symbols"],
      required: [true, "surNam is required"],
    },
    password: {
      type: String,
      set: (v: string) => v.trim(),
    },
    _roleId: {
      type: Types.ObjectId,
      ref: "role",
      required: [true, "Role is required"],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const User = model<IUser>("user", userSchema);
