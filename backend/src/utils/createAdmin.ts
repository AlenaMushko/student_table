import bcrypt from "bcrypt";
import mongoose, { Types } from "mongoose";

import { configs } from "../config";
import { Role, User } from "../models";

export const createAdminRole = async () => {
  const existingRole = await Role.findOne({ name: "admin" });
  if (existingRole) {
    return existingRole;
  }

  const adminRole = new Role({
    _id: new mongoose.Types.ObjectId(),
    name: "admin",
    permissions: {
      canCreateManager: true,
    },
  });

  try {
    const savedRole = await adminRole.save();
    console.log("Admin role created successfully:", savedRole);
  } catch (error) {
    console.error("Error creating admin role:", error);
  }
};

export const createAdminUser = async (roleId: Types.ObjectId) => {
  const existingUser = await User.findOne({ email: configs.ADMIN_EMAIL });
  if (existingUser) {
    return existingUser;
  }

  try {
    const hashedPassword = await bcrypt.hash(configs.ADMIN_PASSWORD, 10);

    const adminUser = new User({
      name: "Alona",
      surNam: "Myshko",
      email: configs.ADMIN_EMAIL,
      password: hashedPassword,
      _roleId: roleId,
      isActive: true,
      lastLogin: Date.now(),
    });

    const savedUser = await adminUser.save();
    console.log("Admin user created successfully:", savedUser);
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
};

createAdminRole();
export const initializeAdmin = async () => {
  const role = await createAdminRole();
  if (role) {
    await createAdminUser(role._id);
  }
};
