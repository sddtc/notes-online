import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Footer from "../../src/components/Footer";

describe("render footer", () => {
  it("should render copyright with current year successfully", () => {
    render(<Footer />)
    expect(screen.getByText("Copyright ⓒ 2025")).toBeInTheDocument();
  });
})