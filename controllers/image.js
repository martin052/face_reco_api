// const Clarifai = require('clarifai');
const axios = require('axios');
const MODEL_ID = 'face-detection';
const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';
const returnClarifaiRequestOptions = (imageUrl) => {
    const USER_ID = 'martin0521992';//(the code by your name)
    const PAT = '0f7e8cf552b142229f8f2332f504919b';//(your Clarifai api key)
    const APP_ID = 'Face_detect';//(what you named your app in Clarifai)
    const IMAGE_URL = encodeURIComponent('https://images.newscientist.com/wp-content/uploads/2022/02/14174128/PRI_223554170.jpg?crop=4:3,smart&width=1200&height=900&upscale=true');

    // const IMAGE_URL = imageUrl;


    // const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [{ "data": { "image": { "url": IMAGE_URL } } }]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            // eslint-disable-next-line
            'Authorization': 'Key ' + PAT
        },
        body: raw
    }
    console.log(requestOptions);
    return requestOptions;
};

const handleApiCall = (req, res, axios) => {
    console.log("imageurl: ", req.body.input)
    axios.post("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiRequestOptions(req.body.input))
        .then(response => {
            console.log(response.data); // Log the response data
            res.json(response.data); // Send the response data to the client
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Unable to work with the API');
        });
    // .then(response => response.json())
    // .then(data => res.json(data))
    // .catch(err => res.status(400).json('unable to work with api'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall

};