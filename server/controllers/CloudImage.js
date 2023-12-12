const express = require('express');
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
  cloud_name: 'djghmbxg4', 
  api_key: '539456219147259', 
  api_secret: '8jFmzZ0ASnUeRdzbXsobA6Stqf0' 
});

module.exports = (image) => {
    const withPrefix = 'data:image/png;base64,' + image
    return new Promise((resolve, reject)=>{
        cloudinary.uploader.upload(withPrefix, function (err, result){
            if(result && result.secure_url) {
                return resolve(result.secure_url)
            }
            return reject({message : err.message + "HEY"})
        })
    })

}