// src/utils/notify.ts
export async function sendTelegram(text: string) {
  try {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;
    if (!token || !chatId) return;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
      // مهم في Next 15 لمنع التخزين المؤقت
      cache: "no-store",
    });
  } catch (e) {
    console.error("Telegram notify error:", e);
  }
}
