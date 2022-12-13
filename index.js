const aws = require("aws-sdk");
const { S3 } = require('aws-sdk');
const s3 = new aws.S3({ region: "us-west-2"});

const bucket = "pixelcheck";
const key = "pixelfile.json";

exports.handler = async (event, context, callback) => {    

    if(event.http_method == "GET")
    {
        const pixelfile = await s3.getObject({
            Bucket: bucket,
            Key: key
        }).promise();
    
        const payload = JSON.parse(pixelfile.Body.toString());
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: payload
        };
        return response;
    }
    if(event.sites){
        
        let rawdata = {
            sites: event.sites
        };
        
        const data = JSON.stringify(rawdata);

        
        const output = await s3.putObject({
           Bucket: bucket,
           Key: key,
           Body: data
        }).promise();
        
        console.log("Output: ", output);
        
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers" : "Content-Type",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: "Pixel File Updated"
        };
        return response;
        
    }
    
};
