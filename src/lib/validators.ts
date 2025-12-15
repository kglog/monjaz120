// Simple validators shared between client and server for identity verification
// Returns null when valid, or an error string when invalid.

export function validateFullName(name: string): string | null {
  if (!name || typeof name !== "string") return "required";
  const trimmed = name.trim();
  if (trimmed.length < 4 || trimmed.length > 80) return "length";
  // Allow Arabic/English letters and spaces and basic punctuation (hyphen)
  if (!/^[\p{Letter}\s\-']+$/u.test(trimmed)) return "chars";
  return null;
}

// Luhn algorithm for MOD10 (generic) — used to validate Saudi NID-like numbers
function luhnCheck(num: string): boolean {
  let sum = 0;
  let alt = false;
  for (let i = num.length - 1; i >= 0; i--) {
    let n = parseInt(num.charAt(i), 10);
    if (alt) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function validateSaudiNID(nid: string): string | null {
  if (!nid || typeof nid !== "string") return "required";
  const v = nid.replace(/[^0-9]/g, "");
  if (v.length !== 10) return "length";
  if (!/^[12]/.test(v)) return "prefix"; // citizen 1 or resident 2
  if (!luhnCheck(v)) return "checksum";
  return null;
}

export function validateBirthDate(dobISO: string, minAge = 18): string | null {
  if (!dobISO) return "required";
  const d = new Date(dobISO);
  if (Number.isNaN(d.getTime())) return "invalid";
  const now = new Date();
  if (d > now) return "future";
  const age = now.getFullYear() - d.getFullYear() - ((now.getMonth() < d.getMonth() || (now.getMonth() === d.getMonth() && now.getDate() < d.getDate())) ? 1 : 0);
  if (age < minAge) return "too_young";
  return null;
}

export default { validateFullName, validateSaudiNID, validateBirthDate };

// ASSISTANT_FINAL: true
