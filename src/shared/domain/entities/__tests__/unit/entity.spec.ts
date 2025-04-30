import { validate as uuidValidate } from 'uuid';
import { Entity } from '../../entity';

type StubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<StubProps> {}

describe('Entity unit tests', () => {
  it('should set props and id', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    };
    const entity = new StubEntity(props);

    expect(entity.props).toStrictEqual(props);
    expect(entity.id).not.toBeNull();
    expect(uuidValidate(entity.id)).toBeTruthy();
  });

  it('should accept a valid uuid', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    };
    const id = 'd5f494d0-a368-422f-af18-e77424611096';
    const entity = new StubEntity(props, id);

    expect(uuidValidate(entity.id)).toBeTruthy();
    expect(entity.id).toBe(id);
  });

  it('should convert an entity to a javascript object', () => {
    const props = {
      prop1: 'value1',
      prop2: 15,
    };
    const id = 'd5f494d0-a368-422f-af18-e77424611096';
    const entity = new StubEntity(props, id);

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    });
  });
});
