import { ListCharactersQuery } from './list-characters.query';
import { ICharacterRepository } from '../../domain/interfaces/character.interface';
import { RickAndMortyApiService } from '../../infrastructure/services/rick-and-morty-api.service';

describe('ListCharactersQuery', () => {
  let query: ListCharactersQuery;
  let repository: ICharacterRepository;
  let apiService: RickAndMortyApiService;

  beforeEach(() => {
    repository = { findAll: jest.fn() } as unknown as ICharacterRepository;
    apiService = { getAllCharacters: jest.fn() } as unknown as RickAndMortyApiService;
    query = new ListCharactersQuery(repository, apiService);
  });

  it('should list characters from API and database', async () => {
    (apiService.getAllCharacters as jest.Mock).mockResolvedValue([{ name: 'Rick' }]);
    (repository.findAll as jest.Mock).mockResolvedValue([{ name: 'Morty' }]);

    const characters = await query.execute({ page: 1 });
    expect(apiService.getAllCharacters).toHaveBeenCalledWith({ page: 1 });
    expect(repository.findAll).toHaveBeenCalled();
    expect(characters).toEqual([{ name: 'Rick' }, { name: 'Morty' }]);
  });
});
