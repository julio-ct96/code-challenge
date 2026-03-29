import { ApiResponse } from '@api/interfaces/ApiResponse';

export const buildApiResponseMock = <T>(overrides?: Partial<ApiResponse<T>>): ApiResponse<T> => ({
  data: [] as unknown as T,
  isLoading: false,
  error: null,
  ...overrides,
});
