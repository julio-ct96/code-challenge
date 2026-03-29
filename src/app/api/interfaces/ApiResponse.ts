export interface ApiResponse<T> {
  data: T;
  isLoading: boolean;
  error: string | null;
}
