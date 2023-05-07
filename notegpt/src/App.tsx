import React, { useState, useEffect } from "react";
import "./main.css";
import resp from "./query";
import query from "./query";
import "./App.css";
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
        const updatedNotes = data.map((note: any) => {
          return {
            ...note,
            id: note._id, // Assign the _id field to 'id' for consistency
          };
        });
        setNotes(updatedNotes);
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
    <div className="backdrop-brightness-25 bg-gray-800 min-h-screen min-w-screen">
      <div className=" flex-1 overflow-y-auto container mx-auto md:px-8 bg-gradient-to-br from-purple-500 via-red-500 to-pink-500 rounded-tl-lg rounded-br-lg  rounded-tr-lg rounded-bl-lg  ">
        <div className="flex-none container mx-auto py-8 px-4 md:px-8  ">
          <h1 className="  bg-opacity-20 text-5xl font-sans font-bold text-black text-center
           mb-4  flex items-center justify-center h-full hover:text-green-400 ">NoteGPT</h1>

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
                placeholder="Enter text"
                className="flex flex-col sm:flex-row items-center justify-around gap-4  text-lg text-left font-bold leading-6 border border-gray-400 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                 focus:bg-black transition duration-500 focus:text-white placeholder-black text-black **placeholder-black text-black**"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label htmlFor="content" className="mb-2 font-bold text-gray-800 text-xl">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
                className=" flex flex-col sm:flex-row items-center justify-around gap-4  text-lg text-left font-bold leading-6
                 border border-gray-400 py-2 px-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent
                 focus:bg-black transition duration-500 focus:text-white placeholder-black text-black **placeholder-black text-black** h-40"
              ></textarea>
            </div>
            <div className="flex space-x-4 ...">
              <button
                type="submit"
                className="bg-rose-400 focus:outline-none font-bold focus:ring-2 hover:ring-black-500 focus:border-transparent  hover:bg-black transition duration-30 placeholder-white  text-white py-2 px-4 rounded-md "
              >
                Add Note
              </button>
              <button
                type="button"
                onClick={() => generateContent(title)}
                className=" bg-rose-400 focus:outline-none font-bold focus:ring-2 hover:ring-black-500 focus:border-transparent  hover:bg-black transition duration-30 placeholder-white  text-white py-2 px-4 rounded-md "
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
                className="bg-black text-white rounded-md shadow-lg p-6 mb-10 border-l-8 border-black"
              >
                <h2 className="text-2xl font-bold mb-3 text-green-400">{note.title}</h2>
                <p className="mb-10">{note.content}</p>
                <button
                  className="bg-purple-600  hover:bg-red-700 focus:outline-none font-semibold focus:ring-2 focus:bg-rose-400 text-white py-2 px-4 rounded-md transition duration-300 text-lg"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>


        </div>
      </div>
    </div>
  );
}

export default App;