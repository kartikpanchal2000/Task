const mongoose =require('mongoose');

const discussionSchema= new mongoose.Schema({
    text: String,
    image:String,
    hashtag: [String],
    createdOn: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports=mongoose.model('Discussion',discussionSchema);