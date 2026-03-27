export const TodoFilter = {
  ALL: 'all',
  COMPLETED: 'completed',
  PENDING: 'pending',
} as const satisfies Record<string, string>;

export type TodoFilter = (typeof TodoFilter)[keyof typeof TodoFilter];
