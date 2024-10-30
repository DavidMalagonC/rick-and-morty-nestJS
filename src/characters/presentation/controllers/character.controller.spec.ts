import { Test, TestingModule } from '@nestjs/testing';
import { CharacterController } from './character.controller';
import { CreateCharacterCommand } from '../../application/commands/create-character.command';
import { UpdateCharacterCommand } from '../../application/commands/update-character.command';
import { GetCharacterQuery } from '../../application/queries/get-character.query';
import { ListCharactersQuery } from '../../application/queries/list-characters.query';
import { CreateCharacterDto } from '../dtos/create-character.dto';
import { UpdateCharacterDto } from '../dtos/update-character.dto';

describe('CharacterController', () => {
    let controller: CharacterController;
    let createCharacterCommand: CreateCharacterCommand;
    let updateCharacterCommand: UpdateCharacterCommand;
    let getCharacterQuery: GetCharacterQuery;
    let listCharactersQuery: ListCharactersQuery;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CharacterController],
            providers: [
                { provide: CreateCharacterCommand, useValue: { execute: jest.fn() } },
                { provide: UpdateCharacterCommand, useValue: { execute: jest.fn() } },
                { provide: GetCharacterQuery, useValue: { execute: jest.fn() } },
                { provide: ListCharactersQuery, useValue: { execute: jest.fn() } },
            ],
        }).compile();

        controller = module.get<CharacterController>(CharacterController);
        createCharacterCommand = module.get<CreateCharacterCommand>(CreateCharacterCommand);
        updateCharacterCommand = module.get<UpdateCharacterCommand>(UpdateCharacterCommand);
        getCharacterQuery = module.get<GetCharacterQuery>(GetCharacterQuery);
        listCharactersQuery = module.get<ListCharactersQuery>(ListCharactersQuery);
    });

    it('should create a character', async () => {
        const dto: CreateCharacterDto = {
            id: 1,
            name: 'Rick',
            status: 'Alive',
            species: 'Human',
            gender: 'Male',
            type: '', 
            origin: { name: 'Earth', url: '' },
            location: { name: 'Earth', url: '' },
            image: '',
            episode: [],
            url: '',
            created: ''
        };
        await controller.create(dto);
        expect(createCharacterCommand.execute).toHaveBeenCalledWith(dto);
    });


    it('should update a character', async () => {
        const dto: UpdateCharacterDto = { name: 'Morty' };
        await controller.update('1', dto);
        expect(updateCharacterCommand.execute).toHaveBeenCalledWith('1', dto);
    });

    it('should get a character by id', async () => {
        await controller.getOne('1');
        expect(getCharacterQuery.execute).toHaveBeenCalledWith('1');
    });

    it('should list characters with filters', async () => {
        const filters: { page: number; name: string; status: 'Alive' | 'Dead' | 'unknown' } = {
            page: 1,
            name: 'Rick',
            status: 'Alive'
        };
        await controller.getAll(filters.page, filters.name, filters.status);
        expect(listCharactersQuery.execute).toHaveBeenCalledWith(filters);
    });

});
