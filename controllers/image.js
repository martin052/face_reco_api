const axios = require('axios');

const handleApiCall = (req, res) => {
    const { input } = req.body;
    const MODEL_ID = 'face-detection';
    const MODEL_VERSION_ID = '5e026c5fae004ed4a83263ebaabec49e';
    const USER_ID = 'martin0521992'; // Replace with your user ID
    const PAT = '0f7e8cf552b142229f8f2332f504919b'; // Replace with your Clarifai API key
    const APP_ID = 'Face_detect'; // Replace with your app ID

    const IMAGE_URL = input;

    const raw = JSON.stringify({
        user_app_id: {
            user_id: USER_ID,
            app_id: APP_ID,
        },
        inputs: [
            {
                data: {
                    image: {
                        url: IMAGE_URL,
                    },
                },
            },
        ],
    });



    axios.post(`https://api.clarifai.com/v2/models/${MODEL_ID}/versions/${MODEL_VERSION_ID}/outputs`, raw, {
        headers: {
            'Accept': 'application/json',
            'Authorization': `Key ${PAT}`
        }
    })
        .then(response => {
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Unable to work with the API');
        });
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'));
};

module.exports = {
    handleApiCall,
    handleImage
};
