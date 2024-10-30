import { CreateCharacterCommand } from './create-character.command';
import { ICharacterRepository } from '../../domain/interfaces/character.interface';
import { CreateCharacterDto } from '../../presentation/dtos/create-character.dto';

describe('CreateCharacterCommand', () => {
  let command: CreateCharacterCommand;
  let repository: ICharacterRepository;

  beforeEach(() => {
    repository = { save: jest.fn() } as unknown as ICharacterRepository;
    command = new CreateCharacterCommand(repository);
  });

  it('should save a character', async () => {
    const dto: CreateCharacterDto = {
        id: 1, name: 'Rick', status: 'Alive', species: 'Human', gender: 'Male', origin: { name: 'Earth', url: '' }, location: { name: 'Earth', url: '' }, image: '', episode: [], url: '', created: '',
        type: ''
    };
    await command.execute(dto);
    expect(repository.save).toHaveBeenCalled();
  });
});
