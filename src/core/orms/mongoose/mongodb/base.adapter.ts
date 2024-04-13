import { Model, FilterQuery, Types, UpdateQuery, Document } from 'mongoose';
import { BaseRepository } from './base.repository';
import { Logger } from '@nestjs/common';
export abstract class BaseAdapter<T, E extends Document>
  implements BaseRepository<T, E>
{
  abstract logger: Logger;

  constructor(private readonly model: Model<E>) {}

  abstract mapping(schema: E): T;
  async save(schema: UpdateQuery<E>): Promise<T> {
    let newSchema;
    const checkSchema = await this.model.findOne({ _id: schema.id }).exec();
    if (checkSchema) {
      newSchema = await this.model
        .findOneAndUpdate({ _id: schema.id }, schema, {
          new: true,
        })
        .exec();
    } else {
      newSchema = new this.model(schema);
      newSchema._id = schema.id;
      await newSchema.save();
    }
    return this.mapping({
      ...newSchema.toObject(),
      id: newSchema._id.toString(),
    });
  }
  async saveMany(schemas: UpdateQuery<E[]>): Promise<void> {
    await this.model.updateMany(schemas).exec();
  }
  async findByOptions(filter?: FilterQuery<E>): Promise<T> {
    const schema = await this.model.findOne(filter).exec();
    return this.mapping({ ...schema.toObject(), id: schema._id.toString() });
  }
  async findAll(filter?: FilterQuery<E>): Promise<[T[], number]> {
    const schemas = await this.model.find(filter).exec();
    return [
      schemas.map(
        (schema): T =>
          this.mapping({ ...schema.toObject(), id: schema._id.toString() }),
      ),
      schemas.length,
    ];
  }
  async delete(id: string): Promise<void> {
    await this.model.findByIdAndDelete({ _id: id }).exec();
  }
  async deleteByOptions(filter?: FilterQuery<E>): Promise<void> {
    await this.model.deleteMany(filter).exec();
  }
  async softDelete(id: string): Promise<void> {
    await this.model
      .findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true })
      .exec();
  }
}
