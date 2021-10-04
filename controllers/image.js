const Clarifai = require ('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.API_CLARIFAI
   });

// Insert here the initialization code as outlined on this page:
// https://docs.clarifai.com/api-guide/api-overview/api-clients#client-installation-instructions

const fs = require("fs");

const handleImageUpload = () =>{
  const imageBytes = fs.readFileSync("{https://face--brain.herokuapp.com/image-upload}");

  stub.PostInputs(
      {
          inputs: [{data: {image: {base64: imageBytes}}}]
      },
      metadata,
      (err, response) => {
          if (err) {
              throw new Error(err);
          }

          if (response.status.code !== 10000) {
              throw new Error("Post inputs failed, status: " + response.status.description);
          }
      }
  );
}

const handleApiCall = (req, res) => {
   app.models
      .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
      .then(data => {
        res.json(data);
      })
      .catch(err => res.status(400).json('unable to work with API'))
    }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      if(entries.length){
        res.json(entries[0]);
      } else {
        res.status(400).json("unable to get entries of user with id = " + id);        
      }
      
    })
    .catch(err => res.status(400).json('unable to get entries'))
  }
/* 
  const handleImageUpload = () => (req, res) => {
    console.log(req.files);
    const values = Object.values(req.files);
    const promises = values.map(image => cloudinary.uploader.upload(image.path));
    
    Promise
      .all(promises)
      .then(results => res.json(results));
  } */

  module.exports = {
      handleImage,
      handleApiCall,
      handleImageUpload
  }