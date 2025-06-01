// src/lib/payment.ts
export const paymentProviders = {
  stripe: {
    name: "Stripe",
    connectUrl: "https://dashboard.stripe.com/register",
    docs: "https://stripe.com/docs/api",
  },
  tap: {
    name: "Tap Payments",
    connectUrl: "https://www.tap.company/sa/en/signup",
    docs: "https://tap.company/sa/en/developers",
  },
  paytabs: {
    name: "PayTabs",
    connectUrl: "https://www.paytabs.com/en/register/",
    docs: "https://developers.paytabs.com/",
  },
};

// وظيفة بسيطة (جاهزة للتكامل لاحقًا)
export function getProviderInfo(provider: keyof typeof paymentProviders) {
  return paymentProviders[provider];
}
