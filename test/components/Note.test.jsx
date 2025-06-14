import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import Note from "../../src/components/Note"

describe("handle note component", () => {

    it("should render note content successfully", () => {
        render(<Note content="fake content" />)
        expect(screen.getByText("fake content")).toBeInTheDocument();
    });
})