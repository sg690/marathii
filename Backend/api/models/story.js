const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://ashutoshkale414:Sagar123@marathicluster.gkj89.mongodb.net/?retryWrites=true&w=majority&appName=MarathiCluster');
// var conn =mongoose.Collection;
 
// var storySchema =new mongoose.Schema({
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     category: { type: String, required: true },
//     email: { type: String, required: true },
//     authorName: { type: String, required: true },
//     date: { type: Date, default: Date.now },
//     view: { type: Number, default: 0 }
 
// });
 
// var storyModel = mongoose.model('Stories', storySchema);
// module.exports=storyModel;

var storySchema =new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    email: { type: String, required: true },
    authorName: { type: String, required: true },
    date: { type: Date, default: Date.now },
    view: { type: Number, default: 0 }
   
  });
   
  var storyModel = mongoose.model('Stories', storySchema);
  module.exports=storyModel;
 
