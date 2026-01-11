export const logger = {
  async record(type: string, meta: any) {
    // سجل AuditLog في DB أو external logger
    console.log('[AUDIT]', type, meta);
  }
};