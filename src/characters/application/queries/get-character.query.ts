import { Inject } from '@nestjs/common';
import { ICharacterRepository, CHARACTER_REPOSITORY } from '../../domain/interfaces/character.interface';
import { RickAndMortyApiService } from '../../infrastructure/services/rick-and-morty-api.service';
import { Character } from '../../domain/entities/character.entity';

export class GetCharacterQuery {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly repository: ICharacterRepository,
    private readonly apiService: RickAndMortyApiService
  ) {}

  async execute(id: string): Promise<Character | null> {
    try {
      const apiCharacter = await this.apiService.getCharacterById(id);
      if (apiCharacter) {
        return new Character(
          apiCharacter.id,
          apiCharacter.name,
          apiCharacter.status,
          apiCharacter.species,
          apiCharacter.type,
          apiCharacter.gender,
          apiCharacter.origin,
          apiCharacter.location,
          apiCharacter.image,
          apiCharacter.episode,
          apiCharacter.url,
          apiCharacter.created
        );
      }
    } catch (error) {
      console.error(`Character with ID ${id} not found in API: `, error.message);
    }

    return await this.repository.findById(id);
  }
}
