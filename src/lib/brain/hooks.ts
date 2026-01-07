// ASSISTANT_FINAL: true
// واجهة موحّدة للدماغ بدون افتراض أسماء محددة (start/track/log...)
import * as brainMod from "@/lib/brain";
const b: any = (brainMod as any); // لا تفترض default
const blog = (event: string, props: Record<string, any> = {}) => {
  try { (b.log ?? b.track ?? b.event)?.(event, props); } catch {}
};
// هوكات جاهزة للاستخدام بكل الصفحات:
export const trapHit         = (name: string, meta: any = {}) => blog("trap_hit",        { name, ...meta });
export const disputeOpen     = (orderId: string, by: "buyer"|"seller") => blog("dispute_open",   { orderId, by });
export const disputePropose  = (orderId: string, action: "refund"|"partial"|"reject", percent?: number) =>
  blog("dispute_propose", { orderId, action, percent });
export const disputeResolve  = (orderId: string, result: "refund"|"partial"|"accept") =>
  blog("dispute_resolve", { orderId, result });
export const pointsAward     = (userId: string, points: number, reason: string) =>
  blog("points_award",    { userId, points, reason });
export const dealImpression  = (dealId: string) => blog("deal_impression", { dealId });
export const dealPurchase    = (dealId: string, amount: number) => blog("deal_purchase",  { dealId, amount });
export const riskNote        = (note: string, meta: any = {}) => blog("risk_note", { note, ...meta });
