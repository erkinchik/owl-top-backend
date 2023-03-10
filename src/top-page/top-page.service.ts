import { Injectable } from '@nestjs/common';
import { TopLevelCategory, TopPageModel } from './top-page.model';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel(TopPageModel)
    private readonly topPageModel: ModelType<TopPageModel>,
  ) {}

  async getAllTopPages() {
    return this.topPageModel.find();
  }

  async create(dto: CreateTopPageDto): Promise<DocumentType<TopPageModel>> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string) {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByFirstCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .aggregate([{
        $match: {
          firstCategory
        }
      },
        {
          $group: {
            _id: {secondCategory: '$secondCategory'},
            pages: {
              $push: {
                alias: '$alias',
                title: '$title'
              }
            }
          }
        }])
      .exec();
    // return this.topPageModel
    //   .find(
    //     { firstCategory },
    //     {
    //       alias: 1,
    //       secondCategory: 1,
    //       title: 1,
    //     },
    //   )
    //   .exec();
  }

  async findByText(text: string) {
    return this.topPageModel.find({
      $text: { $search: text, $caseSensitive: false },
    });
  }
  async deleteById(id: string) {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }

  async updateById(id: string, dto: CreateTopPageDto) {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }
}
