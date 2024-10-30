import { Inject } from '@nestjs/common';
import { ICharacterRepository, CHARACTER_REPOSITORY } from '../../domain/interfaces/character.interface';
import { UpdateCharacterDto } from '../../presentation/dtos/update-character.dto';
import { Character } from '../../domain/entities/character.entity';

export class UpdateCharacterCommand {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly repository: ICharacterRepository
  ) {}

  async execute(id: string, data: UpdateCharacterDto): Promise<Character | null> {
    const character = await this.repository.findById(id);
    if (!character) return null;

    character.update(
      data.name || character.name,
      data.status || character.status,
      data.species || character.species,
      data.type || character.type,
      data.gender || character.gender,
      data.origin || character.origin,
      data.location || character.location,
      data.image || character.image,
      data.episode || character.episode,
      data.url || character.url,
      data.created || character.created
    );

    return this.repository.save(character);
  }
}
