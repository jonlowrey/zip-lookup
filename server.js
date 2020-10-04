// Load HTTP module
const express = require('express');
const server = express();
const fs = require('fs');
const axios = require('axios');
const dotenv = require('dotenv').config();

var parseString = require('xml2js').parseString;
let requestBody;
let apiKey;

if (process.env.USPS_API_KEY) {
    apiKey = process.env.USPS_API_KEY;
} else {
    throw Error('API Key Missing, create .env file!');
}


fs.readFile('CityStateLookupRequest.xml', 'utf8', function (err, data) {
    if (err) throw err;
    requestBody = data;
    requestBody = requestBody.replace('APIKEYREPLACE', apiKey);
});

const port = 8080;

server.get("/", (req, res) => {
    if (req.query.zip) { //If request has query with zip
        var zip = req.query.zip;
        console.log('Request for Zipcode: ', zip);
        request = requestBody.replace('ZIPREPLACE', zip);
        axios.get('http://production.shippingapis.com/ShippingAPI.dll',
            {
                params: {
                    API: 'CityStateLookup',
                    XML: request
                }
            }).then(response => {
                console.log(response.data.url);
                console.log(response.data);
                if (response.data.includes('<Error>')) {
                    throw Error('Invalid Zip Code');
                }
                parseString(response.data, function (err, result) {
                    console.dir(JSON.stringify(result));
                    resBodyZipObject = result.CityStateLookupResponse.ZipCode[0];
                    var responseBody = {
                        zipCode: resBodyZipObject.Zip5[0],
                        city: resBodyZipObject.City[0],
                        state: resBodyZipObject.State[0]
                    }
                    res.json(responseBody);
                });
            })
            .catch(error => {
                console.log(error);
                res.status(500)
                    .json({ error: JSON.stringify(error) });

            });
    } else {
        res.status(400)
            .json({error: 'Invalid request'});
    }
});

server.listen(port, () => {
    console.log(`Server listening at ${port}`);
});