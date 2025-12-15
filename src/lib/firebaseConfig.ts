// Minimal Firebase config stub for typechecking and local dev
// Replace with real Firebase initialization when available.

export const db: any = {
  collection: () => ({
    find: () => ({ toArray: async () => [] }),
  }),
};

// ASSISTANT_FINAL: true
