import { ItemMetadataModel } from '../decorators/item-metadata-model';
import { Label } from '../decorators/label';
import { MetadataIdentifier } from '../decorators/metadata-identifier';
import { Template } from '../decorators/template';
import { MetadataMap } from './metadata-map';
import { MetadataModel, MetadataModelExtensions } from './metadata-model';

@MetadataIdentifier('TestPhoneModel')
@Template('FormGroup', 'Form')
class TestPhoneModel extends MetadataModel {
  @Template('TextBox', 'Text Box')
  @Label('Phone Number')
  number: string = '';
}

@MetadataIdentifier('TestPersonNameModel')
@Template('CommonPersonName', 'Person Name')
class TestPersonNameModel extends MetadataModel {
  @Template('TextBox', 'Text Box')
  @Label('First Name')
  firstName: string = '';

  @Template('TextBox', 'Text Box')
  @Label('Last Name')
  lastName: string = '';
}

@MetadataIdentifier('TestPersonModel')
@Template('FormGroup', 'Form')
class TestPersonModel extends MetadataModel {
  @Template('Date', 'Date')
  @Label('DOB')
  birthDate: string = '';

  @Template('CustomPersonName', 'Person Name')
  @Label('Name')
  name: TestPersonNameModel = new TestPersonNameModel();

  @Label('Age')
  age!: number;

  @Template('FormList', 'List')
  @ItemMetadataModel(() => new TestPhoneModel())
  phones: Array<TestPhoneModel> = [];
}

describe('MetadataModel', () => {
  it('should create class metadata', () => {
    // arrange
    const testPersonModel = new TestPersonModel();

    // act
    const classMetadata = MetadataModelExtensions.createClassMetadata(
      testPersonModel,
    );

    // assert
    expect(classMetadata).toBeTruthy();
    expect(classMetadata.metadataIdentifier).toBe('TestPersonModel');
    expect(classMetadata.templateIdentifier).toBe('FormGroup');
  });

  it('should create property metadata', () => {
    // arrange
    const testPersonModel = new TestPersonModel();

    // act
    const propertyMetadata = MetadataModelExtensions.createPropertyMetadata(
      testPersonModel,
      'name',
    );

    // assert
    expect(propertyMetadata).toBeTruthy();
    expect(propertyMetadata.label).toBe('Name');
    expect(propertyMetadata.templateIdentifier).toBe('CustomPersonName');
  });

  it('should get property metadata', () => {
    // arrange
    const testPersonModel = new TestPersonModel();
    testPersonModel.metadataMap = MetadataModelExtensions.createMetadataMap(
      testPersonModel,
    );

    // act
    const firstNameMetadata = MetadataModelExtensions.getPropertyMetadata(
      testPersonModel,
      null,
      'name.firstName',
    );

    // assert
    expect(firstNameMetadata).toBeTruthy();
    expect(firstNameMetadata.label).toBe('First Name');
    expect(firstNameMetadata.templateIdentifier).toBe('TextBox');
  });

  it('should get undefined property metadata if full property path is invalid', () => {
    // arrange
    const testPersonModel = new TestPersonModel();
    testPersonModel.metadataMap = MetadataModelExtensions.createMetadataMap(
      testPersonModel,
    );

    // act
    const firstNameMetadata = MetadataModelExtensions.getPropertyMetadata(
      testPersonModel,
      null,
      'names.firstName',
    );

    // assert
    expect(firstNameMetadata).toBeUndefined();
  });

  it('should create property metadata map', () => {
    // arrange
    const testPersonModel = new TestPersonModel();
    const metadataMap: MetadataMap = {};

    // act
    const propertyMetadataMap = MetadataModelExtensions.createPropertyMetadataMap(
      testPersonModel,
      metadataMap,
    );

    // assert
    expect(propertyMetadataMap).toBeTruthy();
    expect(propertyMetadataMap.birthDate.label).toBe('DOB');
    expect(propertyMetadataMap.birthDate.templateIdentifier).toBe('Date');
    expect(propertyMetadataMap.name.label).toBe('Name');
    expect(propertyMetadataMap.name.templateIdentifier).toBe(
      'CustomPersonName',
    );
    expect(propertyMetadataMap.name.templateIdentifier).not.toBe(
      'CommonPersonName',
    );
    expect(propertyMetadataMap.name.metadataIdentifier).toBe(
      'TestPersonNameModel',
    );
  });

  it('should not create property metadata for property that is not initialized', () => {
    // arrange
    const testPersonModel = new TestPersonModel();
    const metadataMap: MetadataMap = {};

    // act
    const propertyMetadataMap = MetadataModelExtensions.createPropertyMetadataMap(
      testPersonModel,
      metadataMap,
    );

    // assert
    expect(propertyMetadataMap.age).toBeFalsy();
  });

  it('should create metadata map', () => {
    // arrange
    const testPersonModel = new TestPersonModel();

    // act
    testPersonModel.metadataMap = MetadataModelExtensions.createMetadataMap(
      testPersonModel,
    );

    // assert
    expect(testPersonModel.metadataMap).toBeTruthy();
    expect(testPersonModel.metadataMap.TestPersonModel).toBeTruthy();
    expect(testPersonModel.metadataMap.TestPersonNameModel).toBeTruthy();
    expect(testPersonModel.metadataMap.TestPhoneModel).toBeTruthy();
  });
});
