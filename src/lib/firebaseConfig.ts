// Minimal Firebase config stub for typechecking and local dev (monorepo copy)
export const db: any = {
  collection: () => ({
    find: () => ({ toArray: async () => [] }),
  }),
};

// ASSISTANT_FINAL: true
