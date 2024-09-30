import { useState } from 'react';
import axios from 'axios';

const NotesApp = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [query, setQuery] = useState('');
  const [notes, setNotes] = useState([]);

  // Add a new note
  const addNote = async () => {
    await axios.post('http://localhost:3001/notes', { title, content });
    setTitle('');
    setContent('');
  };
  
  const searchNotes = async () => {
    const response = await axios.get('http://localhost:3001/notes/search', { params: { query } });
    setNotes(response.data);
  };
  return (
    <div>
      <h1>Notes App</h1>

      {/* Add Note Form */}
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Note Content"
        />
        <button onClick={addNote}>Add Note</button>
      </div>

      {/* Search Notes */}
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes..."
        />
        <button onClick={searchNotes}>Search</button>
      </div>

      {/* Display Notes */}
      <ul>
        {notes.map((note) => (
          <li key={note._id}>
            <h3>{note._source.title}</h3>
            <p>{note._source.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotesApp;
