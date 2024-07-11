import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    username: "String",
    email: "String",
    phone: "String",
    address: "String",
    password: "String",
  },
  { timestamps: true }
);

const User = model("users", UserSchema);
export default User;
