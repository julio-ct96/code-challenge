export const TodoFormField = {
  TITLE: 'title',
  PRIORITY: 'priority',
} as const satisfies Record<string, string>;

export type TodoFormField = (typeof TodoFormField)[keyof typeof TodoFormField];
