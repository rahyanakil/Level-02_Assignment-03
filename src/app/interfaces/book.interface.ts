export type Genre =
  | "Fiction"
  | "Non-Fiction"
  | "Science"
  | "History"
  | "Fantasy"
  | "Biography"
  | "Mystery"
  | "Romance";
export interface IBook {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available?: boolean;
}
