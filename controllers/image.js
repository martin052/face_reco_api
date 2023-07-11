const axios = require('axios');
// const Clarifai = require('clarifai');
// const returnClarifaiRequestOptions = (imageUrl) => {
//     const USER_ID = 'martin0521992';//(the code by your name)
//     const PAT = '0f7e8cf552b142229f8f2332f504919b';//(your Clarifai api key)
//     const APP_ID = 'Face_detect';//(what you named your app in Clarifai)
//     const IMAGE_URL = imageUrl;
//     // const IMAGE_URL = this.state.input;
//     const raw = JSON.stringify({
//         "user_app_id": {
//             "user_id": USER_ID,
//             "app_id": APP_ID
//         },
//         "inputs": [{ "data": { "image": { "url": IMAGE_URL } } }]
//     });
//     const requestOptions = {
//         method: 'POST',
//         headers: {
//             'Accept': 'application/json',
//             // eslint-disable-next-line
//             'Authorization': 'Key ' + PAT
//         },
//         body: raw
//     }
//     console.log(requestOptions);
//     return requestOptions;
// };

// const MODEL_ID = 'face-detection';
// const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';


// const handleApiCall = (req, res, axios) => {
//     console.log("imageurl: ", req.body.input)
//     axios.post("https://api.clarifai.com/v2/models/" + MODEL_ID + "/versions/" + MODEL_VERSION_ID + "/outputs", returnClarifaiRequestOptions(req.body.input))
const handleApiCall = (req, res) => {
    const PAT = '0f7e8cf552b142229f8f2332f504919b';
    const IMAGE_URL = req.body.id;
    const raw = {
        "user_app_id": {
            "user_id": 'martin0521992',
            "app_id": 'Face_detect'
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": IMAGE_URL
                    }
                }
            }
        ]
    };


    axios.post("https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
        raw,
        {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Key ' + PAT
            }
        }
    )
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