import crypto from 'crypto';

class PasswordUtils {
  static validPassword(password, hash, salt) {
    const passwordHashed = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return passwordHashed === hash;
  }

  static genPassword(password) {
    const salt = crypto.randomBytes(32).toString('hex');
    const hash = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');

    return {
      salt,
      hash,
    };
  }

  static comparePasswords(password, hash, salt) {
    const passwordHashed = crypto
      .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
      .toString('hex');
    return passwordHashed === hash;
  }
}

export default PasswordUtils;