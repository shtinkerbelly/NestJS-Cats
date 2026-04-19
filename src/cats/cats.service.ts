import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { v4 as uuid } from 'uuid';
import { CatsRepository } from './cat.repository';
import { SearchCatDto } from './dto/search-cat.dto';

@Injectable()
export class CatsService {
  constructor(private readonly catsRepository: CatsRepository) {}

  create(createCatDto: CreateCatDto) {
    const newCat: Cat = {
      id: uuid(),
      ...createCatDto,
    };

    return this.catsRepository.add(newCat);
  }

  findAll() {
    return this.catsRepository.findAll();
  }

  findById(id: string) {
    return this.catsRepository.findById(id);
  }

  search(searchCatDto: SearchCatDto) {
    const results = this.catsRepository.findByCriteria(
      searchCatDto.name,
      searchCatDto.age,
      searchCatDto.breed,
    );

    if (results.length === 0) {
      throw new NotFoundException('No cats found matching search query');
    }

    return results;
  }

  update(id: string, updateCatDto: UpdateCatDto) {
    return this.catsRepository.update(id, updateCatDto);
  }

  remove(id: string) {
    return this.catsRepository.remove(id);
  }
}
