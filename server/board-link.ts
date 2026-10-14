/**
 * `HERDR_WEB_BOARD_PATH`: opt-in link to a page the operator serves beside this app (a task board
 * behind the same reverse proxy, for example). The More menu then offers it and the browser goes
 * there in the same tab; the app proxies and embeds nothing. Only a same-origin path counts: a
 * full URL, `//host` or anything with a backslash, space or control character is ignored, so the
 * menu can never send a user to another site. Unset or ignored, there is no menu item.
 */
export function boardPath(value: string | undefined = process.env["HERDR_WEB_BOARD_PATH"]): string | null {
  if (value && /[\u0000-\u001f\u007f]/.test(value)) return null;
  const path = value?.trim();
  if (!path || !path.startsWith("/") || path.startsWith("//") || /[\\\s\u0000-\u001f\u007f]/.test(path)) return null;
  try {
    return new URL(path, "http://board.invalid").origin === "http://board.invalid" ? path : null;
  } catch {
    return null;
  }
}
