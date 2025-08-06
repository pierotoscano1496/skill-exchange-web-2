import { render, screen } from "@testing-library/react";
import HomePage from "@/app/page";

it("renders homepage", () => {
  render(<HomePage />);
  expect(screen.getByText("Chambita")).toBeInTheDocument();
});
