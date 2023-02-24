import React, { useState } from "react";
import "./main.css";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (title.trim() === "" || content.trim() === "") {
      return;
    }
    const newNote: Note = {
      id: Date.now(),
      title: title,
      content: content
    };
    setNotes([...notes, newNote]);
    setTitle("");
    setContent("");
  };

  const handleDeleteNote = (noteId: number) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <div className="flex-none container mx-auto py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Notes App</h1>
        <form onSubmit={handleAddNote} className="mb-8">
          <div className="flex flex-col mb-4">
            <label htmlFor="title" className="mb-2 font-bold text-gray-800">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="border border-gray-400 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="content" className="mb-2 font-bold text-gray-800">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(event) => setContent(event.target.value)}
              className="border border-gray-400 py-2 px-3 rounded-md h-40 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md"
          >
            Add Note
          </button>
        </form>
      </div>
      <div className="flex-1 overflow-y-auto container mx-auto py-4 px-4 md:px-8">
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-white rounded-md shadow-md p-4 mb-4 border-l-4 border-green-500"
            >
              <h2 className="text-xl font-bold mb-2">{note.title}</h2>
              <p className="mb-2">{note.content}</p>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                onClick={() => handleDeleteNote(note.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
