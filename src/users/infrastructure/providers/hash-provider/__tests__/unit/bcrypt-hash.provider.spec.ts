import { BcryptjsHashProvider } from '../../bcrypt-hash.provider';
import bcryptjs from 'bcryptjs';

describe('BcryptjsHashProvider', () => {
  let sut: BcryptjsHashProvider;

  beforeEach(() => {
    sut = new BcryptjsHashProvider();
  });

  it('should return encrypted password', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);

    expect(hash).toBeDefined();
  });

  it('should return false on invalid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash('fake', hash);

    expect(result).toBeFalsy();
  });

  it('should return true on valid password and hash comparison', async () => {
    const password = 'TestPassword123';
    const hash = await sut.generateHash(password);
    const result = await sut.compareHash(password, hash);

    expect(result).toBeTruthy();
  });

  it('should call bcrypt hash function on generateHash', async () => {
    const password = 'TestPassword123';
    const bcryptHashSpyOn = jest.spyOn(bcryptjs, 'hash');
    await sut.generateHash(password);

    expect(bcryptHashSpyOn).toHaveBeenCalled();
  });

  it('should call bcrypt compare function on generateHash', async () => {
    const password = 'TestPassword123';
    const compareHashSpyOn = jest.spyOn(bcryptjs, 'compare');
    const hash = await sut.generateHash(password);
    await sut.compareHash(password, hash);

    expect(compareHashSpyOn).toHaveBeenCalled();
  });
});
