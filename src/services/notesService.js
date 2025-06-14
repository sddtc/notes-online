
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_DB_HOST
const supabaseKey = import.meta.env.VITE_DB_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
const notesOnlineTable = 'notes-online';

async function getNotes() {
  const { data, error } = await supabase.from(notesOnlineTable).select('note');

  if (error) {
    return []
  }

  return data.map(d => d.note);
}

async function putNote(newNote) {
  const record = { note: newNote, creator: "anonymous" }
  await supabase.from(notesOnlineTable).insert(record, { returning: 'minimal' });
}

async function deleteNote(note) {
  await supabase.from(notesOnlineTable).delete().eq('note', note);
}

export default { getNotes, putNote, deleteNote };