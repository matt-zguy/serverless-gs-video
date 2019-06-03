import setInputFile from './setInputFile';

const mockInputs = [
    {
        FileInput: `path/to/default/file`,
        foo: `bar`,
    }
];

const expectedResults = [
    {
        FileInput: `path/to/input/file`,
        foo: `bar`
    }
];

test('Insert specified input file path into config', () => {
    expect(setInputFile(mockInputs, `path/to/input/file`)).toEqual(expectedResults);
});
