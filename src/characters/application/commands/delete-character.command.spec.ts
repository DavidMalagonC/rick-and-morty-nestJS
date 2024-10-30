import { DeleteCharacterCommand } from './delete-character.command';
import { ICharacterRepository } from '../../domain/interfaces/character.interface';

describe('DeleteCharacterCommand', () => {
  let command: DeleteCharacterCommand;
  let repository: ICharacterRepository;

  beforeEach(() => {
    repository = { deleteById: jest.fn() } as unknown as ICharacterRepository;
    command = new DeleteCharacterCommand(repository);
  });

  it('should delete a character by id', async () => {
    const characterId = '1000000';

    await command.execute(characterId);

    expect(repository.deleteById).toHaveBeenCalledWith(characterId);
  });
});
