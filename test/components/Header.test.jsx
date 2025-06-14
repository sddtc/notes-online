import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import Header from "../../src/components/Header"

describe("render header", () => {
    it("should render title successfully", () => {
        render(<Header />);
        expect(screen.getByText("Notes online")).toBeInTheDocument()
    });
})