import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  genre: [{ type: String, required: true, trim: true }],
  artist: [{ type: String, required: true, trim: true }],
  album: { type: String, required: true, trim: true },
  path: { type: String, required: true, trim: true },
  addedAt: { type: Date, required: true, default: Date.now },
  meta: {
    plays: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
  },
});

const Song = mongoose.model("Song", songSchema);

export default Song;
