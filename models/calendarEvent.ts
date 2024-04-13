import mongoose from "mongoose";

const Schema = mongoose.Schema;
const calendarEventSchema = new Schema({
    id: Number,
    owner: String,
    title: String,
    start: Date,
    end: Date,
    description: String,
    attendees: [String]
},{
    collection: "calendar"
});
const Model = mongoose.model("calendarEvent",calendarEventSchema);
export default Model;