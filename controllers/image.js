const axios = require('axios');
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
            console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json('Unable to work with the API');
        });
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