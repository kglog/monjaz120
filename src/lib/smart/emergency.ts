export const emergency = {
  async trigger(reason: string) {
    // مفعل الطوارئ: تعطيل uploads أو فرض قيود مؤقتة
    console.warn('EMERGENCY TRIGGERED:', reason);
  }
};