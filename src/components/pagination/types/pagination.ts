export type PaginatedDataType<T, Cursor = string> = {
  list: T[];
  metadata: { count: number; hasNextPage: boolean; cursor?: Cursor };
};
