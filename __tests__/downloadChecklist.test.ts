/**
 * @jest-environment jsdom
 */
import { downloadText } from "@/lib/downloadChecklist";

describe("downloadText()", () => {
  let createObjectURLMock: jest.Mock;
  let revokeObjectURLMock: jest.Mock;
  let appendChildSpy: jest.SpyInstance;
  let removeSpy: jest.SpyInstance;
  let clickSpy: jest.SpyInstance;

  beforeEach(() => {
    createObjectURLMock = jest.fn().mockReturnValue("blob:fake-url");
    revokeObjectURLMock = jest.fn();
    global.URL.createObjectURL = createObjectURLMock;
    global.URL.revokeObjectURL = revokeObjectURLMock;

    clickSpy = jest.fn();
    removeSpy = jest.fn();

    jest.spyOn(document, "createElement").mockReturnValue({
      href: "",
      download: "",
      click: clickSpy,
      remove: removeSpy,
    } as unknown as HTMLAnchorElement);

    appendChildSpy = jest.spyOn(document.body, "appendChild").mockImplementation((node) => node);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("creates a blob URL and triggers download", () => {
    downloadText("checklist.txt", "Line 1\nLine 2");
    expect(createObjectURLMock).toHaveBeenCalledTimes(1);
    expect(appendChildSpy).toHaveBeenCalledTimes(1);
    expect(clickSpy).toHaveBeenCalledTimes(1);
    expect(removeSpy).toHaveBeenCalledTimes(1);
    expect(revokeObjectURLMock).toHaveBeenCalledWith("blob:fake-url");
  });

  it("sets the correct filename on the anchor element", () => {
    const createElementSpy = jest.spyOn(document, "createElement").mockReturnValue({
      href: "",
      download: "",
      click: jest.fn(),
      remove: jest.fn(),
    } as unknown as HTMLAnchorElement);

    downloadText("my-checklist.txt", "content");
    const anchor = createElementSpy.mock.results[0].value as HTMLAnchorElement;
    expect(anchor.download).toBe("my-checklist.txt");
  });
});
