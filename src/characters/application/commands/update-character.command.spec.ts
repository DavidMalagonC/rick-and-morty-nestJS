import { UpdateCharacterCommand } from './update-character.command';
import { ICharacterRepository } from '../../domain/interfaces/character.interface';
import { UpdateCharacterDto } from '../../presentation/dtos/update-character.dto';

describe('UpdateCharacterCommand', () => {
  let command: UpdateCharacterCommand;
  let repository: ICharacterRepository;

  beforeEach(() => {
    repository = { findById: jest.fn(), save: jest.fn() } as unknown as ICharacterRepository;
    command = new UpdateCharacterCommand(repository);
  });

  it('should update a character', async () => {
    const character = { id: 1, name: 'Rick', update: jest.fn() };
    (repository.findById as jest.Mock).mockResolvedValue(character);
    const dto: UpdateCharacterDto = { name: 'Updated Rick' };

    await command.execute('1', dto);
    expect(character.update).toHaveBeenCalledWith(dto.name, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    expect(repository.save).toHaveBeenCalledWith(character);
  });
});
