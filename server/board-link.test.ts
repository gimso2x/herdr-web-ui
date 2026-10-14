import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { boardPath } from "./board-link.ts";

describe("boardPath", () => {
  let previous: string | undefined;
  beforeEach(() => {
    previous = process.env["HERDR_WEB_BOARD_PATH"];
    delete process.env["HERDR_WEB_BOARD_PATH"];
  });
  afterEach(() => {
    if (previous === undefined) delete process.env["HERDR_WEB_BOARD_PATH"];
    else process.env["HERDR_WEB_BOARD_PATH"] = previous;
  });
  it("is off unless HERDR_WEB_BOARD_PATH names a path", () => {
    expect(boardPath(undefined)).toBeNull();
    expect(boardPath("")).toBeNull();
    expect(boardPath("   ")).toBeNull();
  });

  it("keeps a same-origin path, trimmed, with its query and trailing slash", () => {
    expect(boardPath("/task/")).toBe("/task/");
    expect(boardPath("  /task/?lane=open  ")).toBe("/task/?lane=open");
  });

  it("never leaves the origin, nor takes a path that is not one", () => {
    for (const value of ["task/", "https://example.com/task/", "//example.com/task/", "/\\example.com", "/ta sk/", "/task/\n", "javascript:alert(1)"]) {
      expect(boardPath(value), value).toBeNull();
    }
  });
});
