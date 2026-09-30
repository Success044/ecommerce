export function safeReturnTo(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") ||
    value.startsWith("//") || /[\\\x00-\x20]/.test(value)) return "/cart";

  const url = new URL(value, "https://store.invalid");
  if (url.origin !== "https://store.invalid" ||
    !(url.pathname === "/cart" || url.pathname === "/products" || /^\/products\/[1-9]\d*$/.test(url.pathname))) {
    return "/cart";
  }
  return `${url.pathname}${url.search}`;
}
