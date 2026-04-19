import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsRepository {
  private readonly cats: Cat[] = [];

  findAll() {
    return this.cats;
  }

  findById(id: string) {
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

  add(cat: Cat) {
    this.cats.push(cat);
    return cat;
  }
}
