import { beforeEach, describe, it, vi, expect } from "vitest";
import notesService from "../../src/services/notesService";

const mockSelectFunction = vi.fn();
const mockInsertFunction = vi.fn();
const mockDeleteFunction = vi.fn();
const mockEqFunction = vi.fn();

const { supabaseMockClient } = vi.hoisted(() => {
    return {
        supabaseMockClient: {
            from: vi.fn(() => ({
                select: mockSelectFunction,
                insert: mockInsertFunction,
                delete: vi.fn(() => ({
                    eq: mockEqFunction
                })),
            }))
        }
    }
});

vi.mock('@supabase/supabase-js', () => ({
    createClient: vi.fn(() => supabaseMockClient),
}));

describe("notes service layer tests", () => {

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("should return notes array", async () => {
        mockSelectFunction.mockResolvedValue({ data: [{ note: 'note1' }, { note: 'note2' }], error: null })

        const result = await notesService.getNotes();

        expect(supabaseMockClient.from).toHaveBeenCalledWith('notes-online');
        expect(supabaseMockClient.from().select).toHaveBeenCalledWith('note');
        expect(result).toEqual(['note1', 'note2']);
    });

    it("should return empty array when return error", async () => {
        mockSelectFunction.mockResolvedValue({ data: null, error: "some errors" });

        const result = await notesService.getNotes();

        expect(result).toEqual([]);
    });

    it("should save note successfully", async () => {
        mockInsertFunction.mockResolvedValue();

        await notesService.putNote("new fake note");

        expect(supabaseMockClient.from).toHaveBeenCalledWith('notes-online');
        expect(supabaseMockClient.from().insert).toHaveBeenCalledWith({ note: "new fake note", creator: "anonymous" }, { returning: 'minimal' });
    });

    it("should delete note successfully", async () => {
        mockDeleteFunction.mockResolvedValue();
        mockEqFunction.mockResolvedValue();

        await notesService.deleteNote("fake note");

        expect(supabaseMockClient.from().delete().eq).toHaveBeenCalledWith('note', 'fake note');
    })
});