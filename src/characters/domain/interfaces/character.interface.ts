import { Character } from '../entities/character.entity';

export const CHARACTER_REPOSITORY = 'CHARACTER_REPOSITORY';

export interface ICharacterRepository {
  save(character: Character): Promise<Character>;
  findById(id: string): Promise<Character | null>;
  findAll(): Promise<Character[]>;
  deleteById(id: string): Promise<boolean>;

}
