import React, { useEffect, useState } from "react"
import Header from "./Header"
import Footer from "./Footer"
import Note from "./Note"
import CreateArea from "./CreateArea"
import notesService from "../services/notesService"

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    async function fetchData() {
      const allNotes = await notesService.getNotes()
      if (allNotes.length > 0) {
        setNotes(allNotes)
      }
    }
    fetchData()
  }, [])

  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote.content]
    })

    notesService.putNote(newNote.content)
  }

  function deleteNote(id) {
    const note = notes.filter((noteItem, index) => {
      return index == id
    })[0]

    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id
      })
    })

    notesService.deleteNote(note)
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      <div className="notes">
        {notes.map((noteItem, index) => {
          return (
            <Note
              key={index}
              id={index}
              content={noteItem}
              onDelete={deleteNote}
            />
          )
        })}
      </div>
      <Footer />
    </div>
  )
}

export default App
