import { UserEntity, UserProps } from '../../user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('UserEntity unit tests', () => {
  let props: UserProps;
  let sut: UserEntity;

  beforeEach(() => {
    props = UserDataBuilder({});
    sut = new UserEntity(props);
  });
  it('should instanciate UserEntity', () => {
    expect(sut.props.name).toEqual(props.name);
    expect(sut.props.email).toEqual(props.email);
    expect(sut.props.password).toEqual(props.password);
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should return name field', () => {
    expect(sut.props.name).toBeDefined();
    expect(sut.props.name).toEqual(props.name);
    expect(typeof sut.props.name).toBe('string');
  });

  it('should set name field', () => {
    sut['name'] = 'Other name';
    expect(sut.props.name).toEqual('Other name');
    expect(typeof sut.props.name).toBe('string');
  });

  it('should return email field', () => {
    expect(sut.props.email).toBeDefined();
    expect(sut.props.email).toEqual(props.email);
    expect(typeof sut.props.email).toBe('string');
  });

  it('should return password field', () => {
    expect(sut.props.password).toBeDefined();
    expect(sut.props.password).toEqual(props.password);
    expect(typeof sut.props.password).toBe('string');
  });

  it('should set password field', () => {
    sut['password'] = 'Other password';
    expect(sut.props.password).toEqual('Other password');
    expect(typeof sut.props.password).toBe('string');
  });

  it('should return createdAt field', () => {
    expect(sut.props.createdAt).toBeDefined();
    expect(sut.props.createdAt).toBeInstanceOf(Date);
  });

  it('should update an user ', () => {
    sut.update('Other name');
    expect(sut.props.name).toEqual('Other name');
  });

  it('should update an user password', () => {
    sut.updatePassword('Other password');
    expect(sut.props.password).toEqual('Other password');
  });
});
