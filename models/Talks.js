var mongoose = require('mongoose');
var TalkSchema = new mongoose.Schema({
   picture: String,
  upvotes: {type: Number, default: 0},
user: String,
});
TalkSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};
TalkSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};
mongoose.model('Talk', TalkSchema);