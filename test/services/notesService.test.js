import { beforeEach, describe, it, vi, expect } from "vitest"
import notesService from "../../src/services/notesService"

const mockSelect = vi.fn()
const mockInsert = vi.fn()
const mockDelete = vi.fn()
const mockEq = vi.fn()

const { supabaseMockClient } = vi.hoisted(() => {
  return {
    supabaseMockClient: {
      from: vi.fn(() => ({
        select: mockSelect,
        insert: mockInsert,
        delete: vi.fn(() => ({
          eq: mockEq
        })),
      }))
    }
  }
})

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => supabaseMockClient),
}))

describe("notes service layer tests", () => {

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("should return notes array", async () => {
    mockSelect.mockResolvedValue({ data: [{ note: 'note1' }, { note: 'note2' }], error: null })

    const result = await notesService.getNotes()

    expect(supabaseMockClient.from).toHaveBeenCalledWith('notes-online')
    expect(supabaseMockClient.from().select).toHaveBeenCalledWith('note')
    expect(result).toEqual(['note1', 'note2'])
  })

  it("should return empty array when return error", async () => {
    mockSelect.mockResolvedValue({ data: null, error: "some errors" })

    const result = await notesService.getNotes()

    expect(result).toEqual([])
  })

  it("should save note successfully", async () => {
    mockInsert.mockResolvedValue()

    await notesService.putNote("new fake note")

    expect(supabaseMockClient.from).toHaveBeenCalledWith('notes-online')
    expect(supabaseMockClient.from().insert).toHaveBeenCalledWith({ note: "new fake note", creator: "anonymous" }, { returning: 'minimal' })
  })

  it("should delete note successfully", async () => {
    mockDelete.mockResolvedValue()
    mockEq.mockResolvedValue()

    await notesService.deleteNote("fake note")

    expect(supabaseMockClient.from().delete().eq).toHaveBeenCalledWith('note', 'fake note')
  })
})