import mongoose from "mongoose";

const subjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add name!"],
  },
  hours: {
    type: String,
    required: [true, "Please add hours!"],
  },
  ects: {
    type: Number,
    required: [true, "Please add ECTS!"],
  },
  lecturer: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default mongoose.model("Subject", subjectSchema);