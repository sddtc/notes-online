
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_DB_HOST
const supabaseKey = import.meta.env.VITE_DB_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

async function getNotes() {
    const { data, error } = await supabase.from("notes-online").select('note');

    return data.map(d => d.note);
}

async function putNote(newNote) {
    const record = { note: newNote, creator: "anonymous" }
    await supabase.from("notes-online").insert(record);

    console.log("put note successfully.")
}

async function deleteNote(note) {
    const response = await supabase
        .from('notes-online')
        .delete()
        .eq('note', note)
}

export default { getNotes, putNote, deleteNote };