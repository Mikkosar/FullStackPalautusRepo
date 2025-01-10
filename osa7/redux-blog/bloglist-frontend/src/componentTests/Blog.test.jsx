import { render, screen } from "@testing-library/react";
import Blog from "../components/Blog";
import userEvent from "@testing-library/user-event";

describe("Tests for Blog component", () => {
  test("Blog component renders blogs title", () => {
    const blog = {
      title: "This is a test",
      url: "Test.com",
    };

    const { container } = render(<Blog blog={blog} />);

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("This is a test");
  });

  test('When "view" button is clicked url, likes and author is rendered', async () => {
    const blog = {
      title: "This is a test",
      url: "Test.com",
      likes: 3,
      author: "Tester",
    };

    const { container } = render(<Blog blog={blog} />);

    const user = userEvent.setup();
    const viewButton = container.querySelector("#viewButton");
    await user.click(viewButton);

    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("Tester");
    expect(div).toHaveTextContent("Test.com");
    expect(div).toHaveTextContent(3);
  });

  test('When like button is pressed twice, "handleLike" function is called twice', async () => {
    const blog = {
      title: "This is a test",
      url: "Test.com",
      likes: 3,
      author: "Tester",
    };

    const mockHandler = vi.fn();

    const { container } = render(<Blog blog={blog} handleLike={mockHandler} />);
    const user = userEvent.setup();

    const viewButton = container.querySelector("#viewButton");
    await user.click(viewButton);

    const likeButton = container.querySelector("#likeButton");
    await user.click(likeButton);
    await user.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
