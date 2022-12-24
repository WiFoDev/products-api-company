export class TokenNotProvidedException extends Error {
  constructor() {
    super('Token was not provided');
  }
}
