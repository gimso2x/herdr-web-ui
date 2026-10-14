/**
 * Where focus goes when the control that had it is gone: Add PC closed Settings behind it, a
 * closed row left the roster. The header's workspace-list toggle is the control nearest the PC
 * list, and one of the two is always shown: the drawer's on a phone, the sidebar's on a desktop.
 * Runs a frame later, once React has taken the vanished control out of the document.
 */
export function focusWorkspaceListToggle(): void {
  window.requestAnimationFrame(() => {
    const toggles = document.querySelectorAll<HTMLElement>(".app-header .drawer-toggle, .app-header .sidebar-toggle");
    [...toggles].find((toggle) => toggle.getClientRects().length > 0)?.focus();
  });
}

/**
 * A phone's drawer has just closed (toggle, Escape, scrim, swipe, a lens switch). While it was open
 * the pane behind it was inert, so the focus is in the drawer that is about to hide, or nowhere:
 * the toggle that opened it takes it back. A pane picked in the drawer, a dialog or a control the
 * user moved to meanwhile keeps the focus it was given: only "nowhere" is answered, and a
 * touch screen's keyboard is never raised by it, since the toggle is a button.
 */
export function returnFocusFromDrawer(): void {
  window.requestAnimationFrame(() => {
    const active = document.activeElement;
    const nowhere = active === null || active === document.body || (document.getElementById("workspace-drawer")?.contains(active) ?? false);
    if (nowhere && !modalOpen()) focusWorkspaceListToggle();
  });
}

/**
 * Whether a modal surface is up (Settings, a dialog). A pane that appears under one, as a link
 * that opens Settings mounts it beneath the dialog (lib/deepLink.ts), must not take the focus out
 * of the modal: its composer and its grid leave the keyboard where it is.
 */
export function modalOpen(): boolean {
  return document.querySelector("[aria-modal='true'], dialog[open]") !== null;
}
