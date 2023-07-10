const axios = require('axios');

const handleApiCall = (req, res) => {
    const PAT = '4d99b5e10ec64aabb3220b963707a62f';
    const IMAGE_URL = req.body.id;
    const raw = {
        "user_app_id": {
            "user_id": 'martin0521992',
            "app_id": 'face_reco'
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
    axios.post(
        "https://api.clarifai.com/v2/models/face-detection/versions/5e026c5fae004ed4a83263ebaabec49e/outputs",
        raw,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Key ' + PAT
            }
        }
    )
        .then(response => {
            console.log('Clarifai API response:', response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log('Clarifai API error:', err);
            res.status(400).json('unable to work with API');
        });
};

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.status(400).json('unable to get entries'));
};

module.exports = {
    handleApiCall,
    handleImage
};
