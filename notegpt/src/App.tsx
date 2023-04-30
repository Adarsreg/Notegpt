import React, { useState, useEffect } from "react";
import "./main.css";
import resp from "./query";
import query from "./query";

interface Note {
  id: string;
  title: string;
  content: string;
}
interface generatedContent {
  title: string;
}

interface CompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    text: string;
    index: number;
    finish_reason: string;
    logprobs?: any;
    text_offset: number;
    selected_text?: string;
    context?: string;
  }[];
}
function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [id, setids] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const [isGenerating, setIsGenerating] = useState(false);
  const newNote: Note = {
    title: title,
    content: content,
    id: id,
  };

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('http://localhost:5000/notes');
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchNotes();
  }, []);



  const handleAddNote = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await fetch("http://localhost:5000/save", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then(res => res.json())
      .then(data => {
        const id = data._id;
        setNotes([...notes, { ...newNote, id }]);
      })
      .catch(error => console.log(error));

    setTitle('');
    setContent('');
  };

  const generateContent = async (title: string) => {
    try {
      setIsGenerating(true);
      const resp = await query(title);

      if (resp !== undefined) {
        setContent(resp);
        setTitle(title);
      } else {
        setContent("Api req error");
      }


    } catch (err) {
      console.error("Error getting response from OpenAI API:", err);
      throw err;
    }


  };











  const handleDeleteNote = async (id: string) => {
    if (!id) {
      console.log('Invalid note id');
      return;
    }

    const res = await fetch(`http://localhost:5000/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => setNotes(data))
      .catch(error => console.log(error));

    setNotes(notes.filter(note => note.id !== id));
  };





  return (
    <div className="bg-teal-50 min-h-screen flex flex-col">
      <div className="flex-none container mx-auto py-8 px-4 md:px-8">
        <h1 className="text-5xl font-custom text-gray-800 mb-4  flex items-center justify-center h-full">NotesGPT</h1>
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
          <div className="flex space-x-4 ...">
            <button
              type="submit"
              className="bg-rose-400 hover:bg-green-400 text-white py-2 px-4 rounded-md"
            >
              Add Note
            </button>
            <button
              type="button"
              onClick={() => generateContent(title)}
              className="bg-gray-500 hover:bg-green-400 text-white py-2 px-5 rounded-md
              "
            >
              Generate
            </button>
          </div>
        </form>
      </div>
      <div className="flex-1 overflow-y-auto container mx-auto py-4 px-4 md:px-8">
        <ul>
          {notes.map((note) => (
            <li
              key={note.id}
              className="bg-rose-300 rounded-md shadow-md p-5 mb-10 border-l-4 border-red-500"
            >
              <h2 className="text-xl font-serif mb-3">{note.title}</h2>
              <p className="mb-2">{note.content}</p>
              <button
                className="bg-red-500 hover:bg-green-400 text-white py-2 px-4 rounded-md"
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