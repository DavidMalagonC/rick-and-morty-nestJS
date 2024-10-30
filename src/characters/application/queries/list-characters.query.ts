import { Inject } from '@nestjs/common';
import { ICharacterRepository, CHARACTER_REPOSITORY } from '../../domain/interfaces/character.interface';
import { RickAndMortyApiService } from '../../infrastructure/services/rick-and-morty-api.service';
import { Character } from '../../domain/entities/character.entity';

export class ListCharactersQuery {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly repository: ICharacterRepository,
    private readonly apiService: RickAndMortyApiService
  ) {}

  async execute(filters: any): Promise<{ characters: any[]; pagination: any }> {
    const { characters: apiCharacters, pagination } = await this.apiService.getAllCharacters(filters);
    const dbCharacters = await this.repository.findAll();

    const allCharacters = [...apiCharacters, ...dbCharacters.map((character) => character.toPlainObject())];

    return { characters: allCharacters, pagination };
  }
}
