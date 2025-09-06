export interface IPaginacao<T> {
  totalPages: number;
  totalElements: number;
  content: T[];
  number: number; 
  size: number;   
  first: boolean;
  last: boolean;
  empty: boolean;
}
