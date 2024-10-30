import { Inject } from '@nestjs/common';
import { ICharacterRepository, CHARACTER_REPOSITORY } from '../../domain/interfaces/character.interface';

export class DeleteCharacterCommand {
  constructor(
    @Inject(CHARACTER_REPOSITORY)
    private readonly repository: ICharacterRepository
  ) {}

  async execute(id: string): Promise<boolean> {
    return await this.repository.deleteById(id);
  }
}
