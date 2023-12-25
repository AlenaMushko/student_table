import { model, Schema } from "mongoose";

import { ERoles } from "../../enums";
import { IRole } from "../../types";

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ERoles,
      required: [true, "Name is required"],
    },
    permissions: {
      canCreateManager: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export const Role = model<IRole>("role", roleSchema);
