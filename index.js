const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5004;

// toystory - password
const MONGODB_URL = "mongodb+srv://toystory:toystory@test-2.qcqm8.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URL || 'mongodb://localhost/test-two', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// define a mongo schema so how our collection is going to be 
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()

    }
})

// Model 
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

// data 
const data = {
    title: "Art",
    body: "Psychology the tradition-bound academic art history of painters like Vincent. An it was developed into a gradual metamorphosis took place in modern sculpture. Psychoanalysis an extraordinary influx of art had begun to."
}

//new instance of the model and passing in the data variable 
const newBlogPost = new BlogPost(data);

// Saving data to our mongo database 
newBlogPost.save((err) => {
   if (err) {
       console.log(err)
   } else {
       console.log('Data has been saved to a collection');
   }
});

// find everything in this database via empty object 
app.get('/api', (req, res) => {
    BlogPost.find({})
       .then(data => {
           //console.log(data);
           res.json(data);
       })
       .catch(error => {
           console.log('error', error);
       })
})

// to tell if the connection has been successfully made 
mongoose.connection.on('connected', ()  => console.log('Mongoose is connected to mongoDB'))


app.listen(PORT, console.log(`Server is starting at ${PORT}`));


//https://www.youtube.com/watch?v=OuCrHynro0w&t=837s&ab_channel=EsterlingAccime

/*
Defines a model or retrieves it. Models defined on the mongoose instance are available to all connection created by the same mongoose instance.

@param name — model name

@param collection — (optional, induced from model name)
*/