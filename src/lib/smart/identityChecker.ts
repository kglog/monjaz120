export const identityChecker = {
  enqueueVerifyJob(payload: any) {
    // ضع مهمة خلفية لعمل OCR و face-match
    console.log('enqueue verify job', payload);
  }
};