import setDestinationBucket from './setDestinationBucket';

const mockOutputGroups = [
    {
        CustomName: "MockOutputGroup1",
        AnotherProperty: 'SomeValue',
        OutputGroupSettings: {
            Baz: 'Bop',
            MockOutputGroup1Settings: {
                Foo: 'Bar',
                Destination: 's3://MediaBucket'
            }
        }
    },
    {
        CustomName: "MockOutputGroup2",
        AnotherProperty: 'SomeValue',
        OutputGroupSettings: {
            Baz: 'Bop',
            MockOutputGroup2Settings: {
                Foo: 'Bar',
                Destination: 's3://MediaBucket'
            }
        }
    }
];

const expectedResult = [
    {
        CustomName: "MockOutputGroup1",
        AnotherProperty: 'SomeValue',
        OutputGroupSettings: {
            Baz: 'Bop',
            MockOutputGroup1Settings: {
                Foo: 'Bar',
                Destination: 's3://output.video/MockOutputGroup1/'
            }
        }
    },
    {
        CustomName: "MockOutputGroup2",
        AnotherProperty: 'SomeValue',
        OutputGroupSettings: {
            Baz: 'Bop',
            MockOutputGroup2Settings: {
                Foo: 'Bar',
                Destination: 's3://output.video/MockOutputGroup2/'
            }
        }
    }
];

const destinationBucket = `output.video`;

test(`value for keys 'Destination' set to destination string value`, () => {
    const result = setDestinationBucket(mockOutputGroups, destinationBucket);
    expect(setDestinationBucket(mockOutputGroups, destinationBucket)).toEqual(expectedResult);
});
