export enum Role {
  Admin = 'admin',
  Operator = 'operator',
  Player = 'player',
}

export interface IFormData {
  username: string;
  email: string;
  password: string;
}
