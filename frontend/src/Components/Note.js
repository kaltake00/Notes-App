import React from 'react'
import {AiOutlineHeart, AiFillHeart , AiOutlineEdit, AiOutlineDelete} from 'react-icons/ai'
import './Note.css'
import SingleExport from './SingleExport'

function Note(props) {
    const note = props.noteData


    const favouriteHandler = () =>{
        if(note.favorite === "true"){
            props.onHeartClicked(note.id, true)
        } else {
            props.onHeartClicked(note.id, false)
        }
    }
    const editHandler = () =>{
        console.log('pencil clicked')
        props.onEdit(note.id)
    }
    const deleteHandler = () =>{
        props.onDelete(note.id)
    }
    return (
        <div className='note-card'>
            <div className='actions-wrapper'>
                {note.favorite === "true"
                    ? <AiFillHeart className='active' onClick={favouriteHandler} />
                    : <AiOutlineHeart  onClick={favouriteHandler} />
                }
                <AiOutlineEdit onClick={editHandler}/>
                <AiOutlineDelete onClick={deleteHandler} />
                <SingleExport data={note}/>
            </div>
            <div className='main-wrapper'>
                <div className='title-wrapper'>
                    <span>Title:</span>
                    <span className='title-text'>{note.title}</span>
                </div>
                <div className='desc-wrapper'>
                    <span>Description:</span>
                    <span className='desc-text'>{note.description}</span>
                </div>
            </div>
            <div className='dates-wrapper'>
                <div className='created-date'>
                    <span className='created-title'>Created at:</span>
                    <span className='created-text'>{note.created_at}</span>
                </div>
                <div className='modified-date'>
                    <span className='modified-title'>Motified at:</span>
                    <span className='modified-text'>{note.modified_at}</span>
                </div>

            </div>
        </div>
    )
}

export default Note