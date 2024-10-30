import { ICharacterRepository } from '../../domain/interfaces/character.interface';
import { Character } from '../../domain/entities/character.entity';
import { firestore } from '../../../config/firebase.config';

export class CharacterRepository implements ICharacterRepository {
  private collection = firestore.collection(process.env.FIREBASE_COLLECTION);

  async save(character: Character): Promise<Character> {
    const docRef = this.collection.doc(character.id.toString());
    await docRef.set({
      id: character.id,
      name: character.name,
      status: character.status,
      species: character.species,
      type: character.type,
      gender: character.gender,
      origin: character.origin,
      location: character.location,
      image: character.image,
      episode: character.episode,
      url: character.url,
      created: character.created,
    });
    return character;
  }

  async findById(id: string): Promise<Character | null> {
    const doc = await this.collection.doc(id).get();
    if (!doc.exists) return null;
    const data = doc.data();
    return new Character(
      data.id,
      data.name,
      data.status,
      data.species,
      data.type,
      data.gender,
      data.origin,
      data.location,
      data.image,
      data.episode,
      data.url,
      data.created,
    );
  }

  async findAll(): Promise<Character[]> {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return new Character(
        data.id,
        data.name,
        data.status,
        data.species,
        data.type,
        data.gender,
        data.origin,
        data.location,
        data.image,
        data.episode,
        data.url,
        data.created,
      );
    });
  }

  async deleteById(id: string): Promise<boolean> {
    const docRef = this.collection.doc(id);
    const doc = await docRef.get();

    if (!doc.exists) {
      return false;
    }

    await docRef.delete();
    return true;
  }
}
