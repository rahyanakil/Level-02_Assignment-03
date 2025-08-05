export type Genre =
  | "FICTION"
  | "NON-FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "FANTASY"
  | "BIOGRAPHY"
  | "MYSTERY"
  | "ROMANCE";
export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}
