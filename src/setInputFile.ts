import {map} from 'lodash';

const setInputFile = (inputSettingsArray, inputFilePath) => {
    return map(inputSettingsArray, (index, key) => {
        const newObject = {
            ...index,
            FileInput: inputFilePath
        };
        return newObject
    });
};

export default setInputFile;
