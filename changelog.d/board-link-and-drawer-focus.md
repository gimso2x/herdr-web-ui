### Added
- `HERDR_WEB_BOARD_PATH=/task/` adds **Task board** to the More menu: a same-origin page you serve
  beside the app, opened in the same tab. Unset, nothing changes.

### Changed
- On a phone the header's icon buttons and the Chat/Terminal switch have a 44px touch target; the
  desktop header keeps its size.

### Fixed
- On a phone, the open workspace list now holds the keyboard: Tab no longer reaches the pane or
  the header buttons behind it, and closing the list returns the focus to its toggle.
