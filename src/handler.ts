'use strict';
import * as fs from 'fs';
import * as AWS from 'aws-sdk';
import setDestinationBucket from './setDestinationBucket';
import setInputFile from './setInputFile';
import {promisify} from 'util';

const readFileAsync = promisify(fs.readFile);

AWS.config.apiVersions = {
  mediaconvert: '2017-08-29'
};

const mediaConvert = new AWS.MediaConvert({
  endpoint: process.env.MEDIA_CONVERT_ENDPOINT,
});

const createJobAsync = (params) => new Promise((resolve, reject) => {
  mediaConvert.createJob(params, (err, response) => {
    if (err !== null) reject(err);
    resolve(response);
  })
});

module.exports.createMediaConvertJob = async (event, context) => {
  try {
    const jobConfig = await readFileAsync('./config/job.json', 'utf8');
    const parsedJobConfig = JSON.parse(jobConfig);
    const inputBucket = event.Records[0].s3.bucket.name;
    const inputKey = event.Records[0].s3.object.key;
    const pathToInputFile = `s3://${inputBucket}/${inputKey}`;

    const params = {
      Role: process.env.MEDIA_CONVERT_ROLE,
      Settings: {
        Inputs: setInputFile(parsedJobConfig.Settings.Inputs, pathToInputFile),
        OutputGroups: setDestinationBucket(parsedJobConfig.Settings.OutputGroups, process.env.DESTINATION_BUCKET),
      }
    };

    return await createJobAsync(params);

  } catch (error) {
    console.error('ERROR: ', error);
  }
};
