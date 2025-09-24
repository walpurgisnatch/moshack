export enum Role {
  Admin = 'admin',
  Operator = 'operator',
  Player = 'player',
}

export enum Rarity {
  Common = 'common',
  Rare = 'rare',
}


export interface IFormData {
  username: string;
  email: string;
  password: string;
}
