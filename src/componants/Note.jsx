import React, { forwardRef } from 'react'

const Note = forwardRef(({ note,...props }, ref) => {
    console.log('note', note);
    return (
        <div 
        ref={ref}
        style={{
            backgroundColor: 'lightyellow',
            width: '200px',
            position: 'absolute',
            left: `${note?.position?.x}px`,
            top: `${note?.position?.y}px`,
            cursor: 'move',
            userSelect: 'none',
            border: '1px solid',
            padding: "5px"
        }}
        // onMouseDown={onMouseDown}
        {...props}
        >
            📌 {note?.text}
        </div>
    )
})

export default Note