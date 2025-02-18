import { loadScript } from "@paypal/paypal-js";

export default defineNuxtPlugin(async (nuxtApp) => {
  const paypal = await loadScript({
    "client-id": process.env.PAYPAL_CLIENT_ID || "test",
    currency: "EUR",
  });

  return {
    provide: {
      paypal,
    },
  };
});