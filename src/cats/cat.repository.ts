import { Injectable, NotFoundException } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsRepository {
  private cats: Cat[] = [];

  findAll() {
    return this.cats;
  }

  findById(id: string) {
    return this.cats.find((cat) => cat.id === id);
  }

  findByCriteria(name?: string, age?: number, breed?: string): Cat[] {
    return this.cats.filter((cat) => {
      const matchName = name ? cat.name.includes(name) : true;
      const matchAge = age ? cat.age === age : true;
      const matchBreed = breed ? cat.breed && cat.breed.includes(breed) : true;
      return matchName && matchAge && matchBreed;
    });
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    const catIndex = this.cats.findIndex((cat) => cat.id === id);

    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }

    const updatedCat = {
      ...this.cats[catIndex],
      ...updateCatDto,
    };

    this.cats[catIndex] = updatedCat;
    return updatedCat;
  }

  remove(id: string) {
    return this.cats.filter((cat) => cat.id !== id);
  }

  add(cat: Cat) {
    this.cats.push(cat);
    return cat;
  }
}
