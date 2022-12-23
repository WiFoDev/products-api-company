export class UserExistsException extends Error {
  constructor() {
    super('User already exists');
  }
}
