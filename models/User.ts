import mongoose, { Schema, Document, model } from "mongoose";

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
}

const UserSchema: Schema<IUser> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true}
}, {
    timestamps: true  // Automatically add createdAt and updatedAt fields
  });
export default mongoose.models.User || model<IUser>('User',UserSchema)