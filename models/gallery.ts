import mongoose from "mongoose";

const Schema = mongoose.Schema;
const GallerySchema = new Schema({
    image: String,
    title: String,
    subtitle: String,
    day: String,
    month: String,
    learnMoreLink: String
},{
    collection: "gallery"
});
const Model = mongoose.model("Gallery",GallerySchema);
export default Model;