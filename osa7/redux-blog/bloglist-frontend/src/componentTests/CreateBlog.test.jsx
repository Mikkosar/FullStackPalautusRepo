import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateBlog from "../components/CreateBlog";
import { expect } from "vitest";

describe("Tests for CreateBlog component", () => {
  test("Blogform sends correct bloginfo and calls functions correctly", async () => {
    const user = userEvent.setup();
    const handleNewBlog = vi.fn();

    const { container } = render(<CreateBlog handleNewBlog={handleNewBlog} />);

    const titleInput = container.querySelector("#blog_title");
    const authorInput = container.querySelector("#blog_author");
    const urlInput = container.querySelector("#blog_url");
    const submitButton = container.querySelector("#blog_submit");

    await user.type(titleInput, "This is a test");
    await user.type(authorInput, "Tester");
    await user.type(urlInput, "Test.com");
    await user.click(submitButton);

    expect(handleNewBlog.mock.calls).toHaveLength(1);
    expect(handleNewBlog.mock.calls[0][0]).toStrictEqual({
      title: "This is a test",
      url: "Test.com",
      author: "Tester",
    });
  });
});
