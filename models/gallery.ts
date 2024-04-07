import mongoose from "mongoose";

const Schema = mongoose.Schema;
const GallerySchema = new Schema({
    image: String, // since "image" holds a string path to the image
    title: String, // since "title" is a string
    subtitle: String, // since "subtitle" is a string
    day: String, // although it's a day, it's represented as a string
    month: String, // since "month" is a string
    learnMoreLink: String // since it's a URL in string format
},{
    collection: "gallery"
});
const Model = mongoose.model("Gallery",GallerySchema);
export default Model;