import { async } from "regenerator-runtime";
import Song from "../models/Song";
import User from "../models/User";

export const home = async (req, res) => {
  const songs = await Song.find({});
  const chart = songs;

  // console.log(songs);
  chart
    .sort(function (a, b) {
      if (a.meta.plays > b.meta.plays) {
        return 1;
      }
      if (a.meta.plays < b.meta.plays) {
        return -1;
      }
      return 0;
    })
    .reverse();
  return res.render("home", { pageTitle: "Home", chart });
};

export const getUpload = (req, res) => {
  return res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const { title, genre, artist, album, path } = req.body;

  try {
    await Song.create({
      title: title,
      album: album,
      path: path,
      genre: genre.split(",").map((word) => `${word}`),
      artist: artist.split(",").map((word) => `${word}`),
      meta: {
        plays: 0,
        likes: 0,
      },
    });
  } catch (error) {
    console.log(error);
    return res.render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
  return res.redirect("/");
};

export const playing = async (req, res) => {
  const { id } = req.params;
  const song = await Song.findById(id);

  if (!song) return res.render("404", { pageTitle: "Song not Found" });

  song.meta.plays = song.meta.plays + 1;
  await song.save();
  return res.render("playing", { pageTitle: `▶️ ${song.title}`, song });
};
