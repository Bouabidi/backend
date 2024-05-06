import { ApiProperty } from '@nestjs/swagger';

export class FilterProductDTO {
  @ApiProperty({
    example: 'category',
    required: true,
  })
  search: string;
}
