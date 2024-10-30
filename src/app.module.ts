import { Module } from '@nestjs/common';
import { CharacterModule } from './characters/character.module';

@Module({
  imports: [CharacterModule],
})
export class AppModule {}
