import { describe, expect, vi } from "vitest"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import App from "../../src/components/App"

const { mockGetNotes, mockDeleteNote, mockPutNote } = vi.hoisted(() => {
  return { mockGetNotes: vi.fn(), mockDeleteNote: vi.fn(), mockPutNote: vi.fn() }
})

vi.mock('../../src/services/notesService', () => {
  return {
    default: { getNotes: mockGetNotes, deleteNote: mockDeleteNote, putNote: mockPutNote }
  }
})

describe("render app", () => {
  it("should show notes successfully", async () => {
    mockGetNotes.mockResolvedValue(["fake note1"])
    render(<App />)
    await waitFor(() => screen.getByText("fake note1"))

    expect(screen.getByText("fake note1")).toBeInTheDocument()
  })

  it("should delete note successfully when click delete note button", async () => {
    mockGetNotes.mockResolvedValue(["fake note1"])
    render(<App />)
    await waitFor(() => screen.getByText("fake note1"))

    const deleteNoteBtn = screen.getByTestId("delete-note")
    fireEvent.click(deleteNoteBtn)

    expect(mockDeleteNote).toHaveBeenCalled(1)
  })

  it("should add note successfully when click add note button", async () => {
    render(<App />)
    await waitFor(() => screen.getByTestId("add-note"))

    const addNoteBtn = screen.getByTestId("add-note")
    fireEvent.click(addNoteBtn)

    expect(mockPutNote).toHaveBeenCalled(1)
  })
})