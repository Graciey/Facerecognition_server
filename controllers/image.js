const Clarifai = require('clarifai');


const app = new Clarifai.App({
    apiKey: process.env.Api-key
   });
const handleApi = (req,res) => {
    const {input} = req.body;
    app.models
    .predict(
     Clarifai.FACE_DETECT_MODEL,
        // URL
        input
    ).then(data => {
        res.json(data);
    }).catch(err => {
        res.status(400).json('unable to work with Api')
    })
}

const handleImage = (req,res,db)=> {
    const {id} = req.body;
    db('users').where('id', '=', id).
    increment('entries', 1).
    returning('entries').
    then(entries => {
        res.json((entries[0]))
    }).
    catch(err => {
        res.status(400).json('unable to get entries')
    })
    // let found = false;
    // database.users.forEach(user=> {
    //     if (user.id === id) {
    //         found = true;
    //         user.entries++;
    //        return res.json(user.entries)
    //     }
        
        
    // })
    // if (!found) {
    //     return res.status(400).json('wrong id')
    //  } 
}



module.exports = {
    handleImage,
    handleApi
}