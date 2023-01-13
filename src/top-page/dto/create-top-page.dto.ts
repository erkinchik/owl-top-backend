import {  TopLevelCategory } from '../top-page.model';
import {IsArray, IsEnum, IsNumber, IsString, ValidateNested} from 'class-validator';
import { Type } from 'class-transformer';


class TopPageAdvantageDto {
    @IsString()
    title: string;
    @IsString()
    description: string;
}
export class HHDataDto {
    @IsNumber()
    count: number;
    @IsNumber()
    juniorSalary: number;
    @IsNumber()
    middleSalary: number;
    @IsNumber()
    seniorSalary: number;
}

export class CreateTopPageDto {

  @IsEnum(TopLevelCategory)
  firstCategory: TopLevelCategory;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @ValidateNested()
  @Type(() => HHDataDto)
  hh?: HHDataDto;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];
}
