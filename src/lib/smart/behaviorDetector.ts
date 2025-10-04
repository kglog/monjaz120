export const behaviorDetector = {
  async quickCheck(req: any, fp: any) {
    // implement heuristics: rate-limit, repeated uploads, same IP, etc.
    return { suspicious:false, block:false };
  }
};