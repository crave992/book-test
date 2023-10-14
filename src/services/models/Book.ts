// models/Book.ts

export interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  published_date: Date;
  genre: string;
}