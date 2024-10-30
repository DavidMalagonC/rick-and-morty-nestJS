export class Character {
    constructor(
      private _id: number,
      private _name: string,
      private _status: 'Alive' | 'Dead' | 'unknown',
      private _species: string,
      private _type: string,
      private _gender: 'Female' | 'Male' | 'Genderless' | 'unknown',
      private _origin: { name: string; url: string },
      private _location: { name: string; url: string },
      private _image: string,
      private _episode: string[],
      private _url: string,
      private _created: string
    ) {}
  
    get id(): number {
      return this._id;
    }
  
    get name(): string {
      return this._name;
    }
  
    set name(value: string) {
      this._name = value;
    }
  
    get status(): 'Alive' | 'Dead' | 'unknown' {
      return this._status;
    }
  
    set status(value: 'Alive' | 'Dead' | 'unknown') {
      this._status = value;
    }
  
    get species(): string {
      return this._species;
    }
  
    set species(value: string) {
      this._species = value;
    }
  
    get type(): string {
      return this._type;
    }
  
    set type(value: string) {
      this._type = value;
    }
  
    get gender(): 'Female' | 'Male' | 'Genderless' | 'unknown' {
      return this._gender;
    }
  
    set gender(value: 'Female' | 'Male' | 'Genderless' | 'unknown') {
      this._gender = value;
    }
  
    get origin(): { name: string; url: string } {
      return this._origin;
    }
  
    set origin(value: { name: string; url: string }) {
      this._origin = value;
    }
  
    get location(): { name: string; url: string } {
      return this._location;
    }
  
    set location(value: { name: string; url: string }) {
      this._location = value;
    }
  
    get image(): string {
      return this._image;
    }
  
    set image(value: string) {
      this._image = value;
    }
  
    get episode(): string[] {
      return this._episode;
    }
  
    set episode(value: string[]) {
      this._episode = value;
    }
  
    get url(): string {
      return this._url;
    }
  
    get created(): string {
      return this._created;
    }
  
    update(
      name: string,
      status: 'Alive' | 'Dead' | 'unknown',
      species: string,
      type: string,
      gender: 'Female' | 'Male' | 'Genderless' | 'unknown',
      origin: { name: string; url: string },
      location: { name: string; url: string },
      image: string,
      episode: string[],
      url: string,
      created: string
    ) {
      this._name = name;
      this._status = status;
      this._species = species;
      this._type = type;
      this._gender = gender;
      this._origin = origin;
      this._location = location;
      this._image = image;
      this._episode = episode;
      this._url = url;
      this._created = created;
    }

    toPlainObject() {
      return {
        id: this._id,
        name: this._name,
        status: this._status,
        species: this._species,
        type: this._type,
        gender: this._gender,
        origin: this._origin,
        location: this._location,
        image: this._image,
        episode: this._episode,
        url: this._url,
        created: this._created,
      };
    }
  }
  