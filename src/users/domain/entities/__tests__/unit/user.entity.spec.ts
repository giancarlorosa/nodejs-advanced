import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    UserEntity.validate = jest.fn();
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });
  it('should instanciate UserEntity', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should return name field', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('should set name field', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    sut['name'] = 'Other name';
    expect(sut.props.name).toEqual('Other name');
    expect(typeof sut.props.name).toBe('string');
  });

  it('should return email field', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('should return password field', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('should set password field', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    sut['password'] = 'Other password';
    expect(sut.props.password).toEqual('Other password');
    expect(typeof sut.props.password).toBe('string');
  });

  it('should return createdAt field', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should update an user ', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    sut.update('Other name');
    expect(sut.props.name).toEqual('Other name');
  });

  it('should update an user password', () => {
    expect(UserEntity.validate).toHaveBeenCalled();
    sut.updatePassword('Other password');
    expect(sut.props.password).toEqual('Other password');
  });
});
