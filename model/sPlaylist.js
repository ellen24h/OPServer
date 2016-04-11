/**
 * Created by Naver on 2016. 4. 5..
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sPlaylistSchema = new Schema({
    playlistNumber: Number,
    artist: String,
    track1Title: String,
    track1URL: String,
    track2Title: String,
    track2URL: String,
    track3Title: String,
    track3URL: String
});

module.exports = mongoose.model('sPlaylist', sPlaylistSchema);

