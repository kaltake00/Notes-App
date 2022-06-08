import React, { useEffect, useState } from 'react';
import './NewNoteModal.css'

export default function CreatingNoteModal(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const data = props.noteData;

    useEffect(()=>{
        if(props.editingModal){
            setTitle(data.title)
            setDescription(data.description)
        }
    }, [])

    /////////////////////////////////////////  Handling input changes
    const handleTitleChange = (event) =>{
        setTitle(event.target.value)
    }
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const handleCloseModal = () =>{
        props.onCloseModal()
    }
    const handleFormSubmit = (e) =>{
        e.preventDefault() // to prevent refreshing page after submiting form
        
        if (props.editingModal){ // if user editing note
            const id = data.id
            const note_data = {title, description, id}
            props.onSaveEditedNote(note_data)
        }else { // if user creating new note
            const note_data = {title, description}
            props.onCreateNote(note_data)
        }

        // clearing form fields
        setDescription('')
        setTitle('')
        props.onCloseModal()
    }

    return (
        <div className='new-note-modal'>
            <div className='backdrop' onClick={handleCloseModal}></div>
            <div className='modal-card'>
                <form onSubmit={handleFormSubmit}>
                    <input value={title ?? ""} type="text" placeholder="Note title" onChange={handleTitleChange} required></input>
                    <input value={description ?? ""} type="text" placeholder="Note description" onChange={handleDescriptionChange} required></input>
                    <button type='submit'>{props.editingModal ? 'Save note' : 'Create note'}</button>
                </form>
            </div>
        </div>
    )
}
