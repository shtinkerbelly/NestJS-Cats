/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(createCatDto: CreateCatDto) {
    console.log(createCatDto);
    const newCat: Cat = {
      id: uuid(),
      ...createCatDto,
    };
    this.cats.push(newCat);
    return newCat;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: string) {
    return this.cats.find((cat) => cat.id === id);
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    return this.cats.map((cat) =>
      cat.id === id ? { ...cat, ...updateCatDto } : cat,
    );
  }

  remove(id: string) {
    return this.cats.filter((cat) => cat.id !== id);
  }
}
