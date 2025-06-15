import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import CreateArea from "../../src/components/CreateArea"

describe("create note component", () => {

  it("should show default style when render note component", () => {
    render(<CreateArea />)
    const textArea = screen.getByRole("textbox")

    expect(textArea).toBeInTheDocument()
    expect(textArea).toHaveAttribute("rows", "1")
  })

  it("should show expand style when click the input area", () => {
    render(<CreateArea />)
    const textArea = screen.getByRole("textbox")
    fireEvent.click(textArea)
    fireEvent.change(textArea, { target: { value: "fake input" } })

    expect(textArea).toHaveAttribute("rows", "3")
    expect(textArea).toHaveValue("fake input")
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("should call addNote func when click add button", () => {
    const mockOnAdd = vi.fn()
    render(<CreateArea onAdd={mockOnAdd} />)
    const textArea = screen.getByRole("textbox")
    fireEvent.click(textArea)
    fireEvent.change(textArea, { target: { value: "fake input" } })

    const addNoteBtn = screen.getByRole("button")
    fireEvent.click(addNoteBtn)

    expect(mockOnAdd).toHaveBeenCalled(1)
    expect(mockOnAdd).toHaveBeenCalledWith({ "content": "fake input" })
  })
})