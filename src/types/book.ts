
export interface Book {
  identifier: string;
  title: string;
  creator?: string;
  description?: string;
  mediatype: string;
  coverUrl?: string;
}

export interface PaginatedResponse {
  books: Book[];
  totalResults: number;
  currentPage: number;
  totalPages: number;
}
