export class NotAuthorizedException extends Error {
  constructor() {
    super('You are not authorized to access this route');
  }
}
