import { Inject } from '@nestjs/common';
import { ICharacterRepository, CHARACTER_REPOSITORY } from '../../domain/interfaces/character.interface';
import { CreateCharacterDto } from '../../presentation/dtos/create-character.dto';
import { Character } from '../../domain/entities/character.entity';

export class CreateCharacterCommand {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly repository: ICharacterRepository
  ) {}

  async execute(data: CreateCharacterDto): Promise<Character> {
    const character = new Character(
      data.id,
      data.name,
      data.status || 'unknown', 
      data.species,
      data.type || '',
      data.gender || 'unknown',
      data.origin || { name: 'unknown', url: '' },
      data.location || { name: 'unknown', url: '' },
      data.image || '',
      data.episode || [],
      data.url || '',
      data.created || new Date().toISOString()
    );
    return this.repository.save(character);
  }
}
