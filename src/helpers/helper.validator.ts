import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Injectable()
export class HelperValidator implements PipeTransform<any> {
  private validationPipe = new ValidationPipe();

  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      // Use the default ValidationPipe to perform validation
      await this.validationPipe.transform(value, metadata);
      return value;
    } catch (error) {
      // If there are multiple validation errors, return only the first one
      if (
        Array.isArray(error.message.message) &&
        error.message.message.length > 0
      ) {
        throw new Error(error.message.message[0]);
      }
      // If there's a single validation error, return it
      throw new Error(error.message.message || error.message);
    }
  }
}
