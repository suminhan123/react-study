import { render, screen } from "@testing-library/react";
import Async from "./Async";

describe("Async component", () => {
  test("renders posts if request succeeds", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => [{ id: "p1", title: "First post" }],
    });
    render(<Async />);

    // 여러개의 리스트가 있는지 확인하려면
    const listItemElements = await screen.findAllByRole("listitem"); // html 요소 배열
    expect(listItemElements).not.toHaveLength(0);
  });
});
