export default interface IPagination<T> {
  total: number;
  page: number;
  pageSize: number;
  total_pages: number;
  items: T[];
}
