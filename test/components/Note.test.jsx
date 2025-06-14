import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import Note from "../../src/components/Note"

describe("handle note component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render note content successfully", () => {
    render(<Note content="fake content" />)
    expect(screen.getByText("fake content")).toBeInTheDocument();
  });

  it("should called delete func when click the delete button", () => {
    const mockDeleteFunc = vi.fn();

    render(<Note onDelete={mockDeleteFunc} id="fake-1" />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockDeleteFunc).toHaveBeenCalledTimes(1)
    expect(mockDeleteFunc).toHaveBeenCalledWith("fake-1")
  })
})