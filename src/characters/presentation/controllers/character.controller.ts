import { Controller, Post, Put, Get, Delete, Param, Body, Query } from '@nestjs/common';
import { CreateCharacterDto } from '../dtos/create-character.dto';
import { UpdateCharacterDto } from '../dtos/update-character.dto';
import { CreateCharacterCommand } from '../../application/commands/create-character.command';
import { UpdateCharacterCommand } from '../../application/commands/update-character.command';
import { GetCharacterQuery } from '../../application/queries/get-character.query';
import { ListCharactersQuery } from '../../application/queries/list-characters.query';
import { DeleteCharacterCommand } from '../../application/commands/delete-character.command';

@Controller('characters')
export class CharacterController {
  constructor(
    private readonly createCharacter: CreateCharacterCommand,
    private readonly updateCharacter: UpdateCharacterCommand,
    private readonly getCharacter: GetCharacterQuery,
    private readonly listCharacters: ListCharactersQuery,
    private readonly deleteCharacter: DeleteCharacterCommand
  ) {}

  @Post()
  async create(@Body() data: CreateCharacterDto) {
    const character = await this.createCharacter.execute(data);
    return character.toPlainObject(); 
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: UpdateCharacterDto) {
    return this.updateCharacter.execute(id, data);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.getCharacter.execute(id);
  }

  @Get()
  async getAll(
    @Query('page') page?: number,
    @Query('name') name?: string,
    @Query('status') status?: 'Alive' | 'Dead' | 'unknown',
    @Query('species') species?: string,
    @Query('type') type?: string,
    @Query('gender') gender?: 'Female' | 'Male' | 'Genderless' | 'unknown'
  ) {
    const filters = { page, name, status, species, type, gender };
    const { characters, pagination } = await this.listCharacters.execute(filters);

    return {
      characters: characters,
      pagination: pagination
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const success = await this.deleteCharacter.execute(id);
    return {
      success,
      message: success
        ? `Character with id ${id} deleted successfully`
        : `Character with id ${id} not found`,
    };
  }
}
