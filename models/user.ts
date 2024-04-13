import mongoose from "mongoose";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    firstName: String,
    LastName: String,
    Username: String,
    EmailAddress: String,
    PhoneNumber: String,
    Password: String
},{
    collection: "users"
});
const Model = mongoose.model("user", UserSchema);
export default Model;