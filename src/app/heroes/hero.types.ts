import { Pagination } from '../models/pagination/pagination.model';

export interface Hero {
  id: number;
  name: string;
  img?: string;
  isPinned: boolean;
}

export class Hero {
  public id: number;
  public name: string;
  public img?: string;
  public isPinned: boolean;

  constructor(json: any) {
    this.id = json.id;
    this.name = json.name;
    this.img = json.image || json.img;
    this.isPinned = false;
  }
}

export interface HeroesState {
  heroes: Hero[];
  pagination: Pagination;
  getRecordsPending: boolean;
}

export class HeroDetail extends Hero {
  public status: string;
  public species: string;
  public type: string;
  public gender: string;

  constructor(json: any) {
    super(json);
    this.status = json.status;
    this.species = json.species;
    this.type = json.type;
    this.gender = json.gender;
  }
}
