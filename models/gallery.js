"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const GallerySchema = new Schema({
    image: String,
    title: String,
    subtitle: String,
    day: String,
    month: String,
    learnMoreLink: String // since it's a URL in string format
}, {
    collection: "gallery"
});
const Model = mongoose_1.default.model("Gallery", GallerySchema);
exports.default = Model;
