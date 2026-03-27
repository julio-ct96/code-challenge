export const Priority = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
} as const satisfies Record<string, number>;

export type Priority = (typeof Priority)[keyof typeof Priority];
