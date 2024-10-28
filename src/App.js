import { useState } from 'react';
import './App.css';
import { Notes } from './componants/Notes';

function App() {
  const [value, setValue] = useState();
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) ? JSON.parse(localStorage.getItem('notes')) : 
  [{
    id: "1",
    text: "Welcome to the world of Programming"
  },
  {
    id: "2",
    text: "What would it be? Java or C++?"
  }]);

  const handleChange = (value) => {
    console.log(value);
    setValue(value);
  }

  const handleButtonSelect = () => {
    document.querySelector('.inputText').value = '';
    if (notes.length > 7) {
      window.alert('Note Limit Exceeded');
    } else {
      let id;
      let idExist;
      do {
        id = Math.floor(Math.random() * 10);
        const idArray = notes.map(note => note.id);
        idExist = idArray.includes(id.toString());
      } while (idExist)
      setNotes([...notes, { id: id.toString(), text: value }]);
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }

  return (
    <div className="App">
      <h1 style={{}}>NOTE GENERATOR</h1>
      <input
        style={
          {
           
          }
        }
        className='inputText'
        onChange={(e) => handleChange(e.target.value)}
        type="text"
        placeholder='Enter the Note...'
      />
      <button className='buttonStyles' disabled={!value} onClick={() => handleButtonSelect()}>SUBMIT</button>
      <Notes notes={notes} setNotes={setNotes} />
    </div>
  );
}

export default App;
