import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export const CustomParseUuidPipe = new ParseUUIDPipe({
  exceptionFactory: () => {
    return new BadRequestException('Invalid ID format');
  },
});
