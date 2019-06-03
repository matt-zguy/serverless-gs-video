import {map, forOwn} from 'lodash';

const setDestinationBucket = (jobOutputArray, destinationBucket) => {
    return map(jobOutputArray, jobSettingsValue => {
        const jobSettingsGroupValues = forOwn(jobSettingsValue.OutputGroupSettings, (jobGroupSettingsValue, jobGroupSettingsKey) => {
            if (jobSettingsValue.OutputGroupSettings[jobGroupSettingsKey].hasOwnProperty('Destination')) {
                jobSettingsValue.OutputGroupSettings[jobGroupSettingsKey].Destination = `s3://${destinationBucket}/${jobSettingsValue.CustomName}/`;
            }
        });
        jobSettingsValue.OutputGroupSettings = jobSettingsGroupValues;

        return jobSettingsValue;
    })
};

export default setDestinationBucket;
