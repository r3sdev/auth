import { BadRequestException } from '@nestjs/common';

export class UserExistsException extends BadRequestException {

  constructor() {
    super('This email is already associated with an account');
  }
}