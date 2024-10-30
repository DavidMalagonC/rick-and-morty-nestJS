import { GetCharacterQuery } from './get-character.query';
import { ICharacterRepository } from '../../domain/interfaces/character.interface';
import { RickAndMortyApiService } from '../../infrastructure/services/rick-and-morty-api.service';

describe('GetCharacterQuery', () => {
  let query: GetCharacterQuery;
  let repository: ICharacterRepository;
  let apiService: RickAndMortyApiService;

  beforeEach(() => {
    repository = { findById: jest.fn() } as unknown as ICharacterRepository;
    apiService = { getCharacterById: jest.fn() } as unknown as RickAndMortyApiService;
    query = new GetCharacterQuery(repository, apiService);
  });

  it('should return a character by id', async () => {
    await query.execute('1');
    expect(repository.findById).toHaveBeenCalledWith('1');
  });
});
