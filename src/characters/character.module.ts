import { Module } from '@nestjs/common';
import { CharacterController } from './presentation/controllers/character.controller';
import { CharacterRepository } from './infrastructure/repositories/character.repository';
import { RickAndMortyApiService } from './infrastructure/services/rick-and-morty-api.service';
import { CreateCharacterCommand } from './application/commands/create-character.command';
import { UpdateCharacterCommand } from './application/commands/update-character.command';
import { GetCharacterQuery } from './application/queries/get-character.query';
import { ListCharactersQuery } from './application/queries/list-characters.query';
import { DeleteCharacterCommand } from './application/commands/delete-character.command';
import { CHARACTER_REPOSITORY } from './domain/interfaces/character.interface';

@Module({
  controllers: [CharacterController],
  providers: [
    { provide: CHARACTER_REPOSITORY, useClass: CharacterRepository },
    RickAndMortyApiService,
    CreateCharacterCommand,
    UpdateCharacterCommand,
    GetCharacterQuery,
    ListCharactersQuery,
    DeleteCharacterCommand,
  ],
})
export class CharacterModule {}
