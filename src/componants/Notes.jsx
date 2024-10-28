import React, { createRef, useEffect, useRef } from 'react'
import Note from './Note';

export const Notes = ({ notes = [], setNotes = () => { } }) => {

    const determineNotePosition = () => {
        const maxX = window.innerWidth - 200;
        const maxY = window.innerHeight - 200;
        const x = Math.floor(Math.random() * maxX);
        const y = Math.floor(Math.random() * maxY);
        return { x, y };
    }

    const handleMouseDrag = (note, event) => {
        const noteRef = noteRefs.current[note.id].current;
        const rect = noteRef.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        const startPosition = note?.position;
        
        const handleMouseMove = (e) => {
            const newX = e.clientX - offsetX;
            const newY = e.clientY - offsetY;
            noteRef.style.left = `${newX}px`;
            noteRef.style.top =`${newY}px`
        }
        const handleMouseUp = () => {
            document.removeEventListener('mousemove',handleMouseMove);
            document.removeEventListener('mouseup',handleMouseUp); 
            const finalPosition = noteRef.getBoundingClientRect(); 
            const newPosition = {x:finalPosition.left,y:finalPosition.top};
            if(checkForOverlap(note.id)){
                noteRef.style.left = `${startPosition.x}px`;
                noteRef.style.top =`${startPosition.y}px`
            }else{
                updateNotePosition(note?.id, newPosition);
            }
        }
        document.addEventListener('mousemove',handleMouseMove);
        document.addEventListener('mouseup',handleMouseUp);
    }

    const updateNotePosition = (id, newPosition)=> {
        const updatedNotes = notes.map(note => note.id === id ? {...note, position:newPosition} : note);
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }

    const checkForOverlap = (id)=> {
        const currentNote = noteRefs.current[id].current;
        const currentRect = currentNote.getBoundingClientRect();
        return notes.some((note)=>{
            if(note?.id === id) return false
            const otherNote = noteRefs.current[note.id].current;
            const otherRect = otherNote.getBoundingClientRect();
            return !(
                currentRect.top>otherRect.bottom ||
                currentRect.bottom<otherRect.top ||
                currentRect.right<otherRect.left ||
                currentRect.left>otherRect.right
            )    
        })
    }

    const noteRefs = useRef([]);

    useEffect(() => {
        const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        const updatedNotes = notes?.map((note) => {
            const savedNote = savedNotes?.find(item => item?.id === note?.id);
            if (savedNote) {
                return { ...note, position: savedNote?.position }
            } else {
                const position = determineNotePosition();
                return { ...note, position }
            }
        });
        setNotes(updatedNotes);
        localStorage.setItem('notes', JSON.stringify(updatedNotes));
    }, [notes.length])

    return (
        <div>
            {notes?.map((note => {
                return <Note
                    ref={noteRefs?.current?.[note?.id] ?
                        noteRefs.current[note?.id] :
                        noteRefs.current[note.id] = createRef()}
                    onMouseDown={(e) => handleMouseDrag(note, e)}
                    key={note?.id}
                    note={note}
                />
            }))}
        </div>
    )
};