import { useState, useEffect } from 'react';
import Axios from "axios";
import './App.css';
import Note from './Components/Note';
import CreatingNoteModal from './Components/NewNoteModal';
import Pagination from './Components/Pagination';
import ExportAll from './Components/ExportAll';

function App() {
	const [notes, setNotes] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const [currentSearchedValues, setCurrentSearchedValues] = useState([])
	const [currentPage, setCurrentPage] = useState(1);
	const [notesPerPage] = useState(5);

	const [creatingModal, setCreatingModal] = useState(false);
	const [editingModal, setEditingModal] = useState(false); 
	const [singleNoteData, setSingleNoteData] = useState({}) // setting single note data for edit modal

	useEffect(() => {
		fetchNotes();
	}, [])

	// Notes APIs
	async function createNote(data) {  //create
		try {
			await Axios.post('http://localhost:5000/api/create', data);
		} catch (err) {
			console.error(err);
		}
		console.log('Created Task Data: ', data)
		fetchNotes();
	}
	async function fetchNotes() { // read
		const { data } = await Axios.get('http://localhost:5000/api/notes');
		setNotes(data);
	};
	async function deleteNote(note_id) { // delete
		await Axios.delete(`http://localhost:5000/api/delete/${note_id}`)
		fetchNotes();
	}
	async function favoriteHandler(note_id, isFavorite){
		if(isFavorite){
			await Axios.put(`http://localhost:5000/api/unfavorite/${note_id}`)
			setSearchTerm("")
			fetchNotes()
		} else {
			await Axios.put(`http://localhost:5000/api/favorite/${note_id}`)
			setSearchTerm("")
			fetchNotes()
		}
	}
	async function updateNote(note_data){
		console.log('Note successfully updated - ', note_data.id)
		await Axios.put(`http://localhost:5000/api/update/${note_data.id}`, note_data)
		setSearchTerm("")
		fetchNotes()
	}
	// Handling modal functions
	const openCreateModal = () => {
		setCreatingModal(true)
	}
	const openEditModal = (note_id) =>{
		setEditingModal(true)
		setSingleNoteData(notes.find(note => note.id === note_id)) // passing note for editing
	}
	const closeModal = () => {
		setCreatingModal(false)
		setEditingModal(false)
	}

	// get current posts
	const indexOfLastNote = currentPage * notesPerPage;
	const indexOfFirstNote = indexOfLastNote - notesPerPage;
	const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);
	// change page
	const handlePagination = (pageNumber) =>{setCurrentPage(pageNumber)}

	// filtering
	var searchedValues = [] 
	const handleSearchInput = (event) =>{
		setSearchTerm(event.target.value)
		searchedValues = notes.filter((val)=>{
			if (val.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase())){
				return val
			}
			return false;
		})
		setCurrentSearchedValues(searchedValues.slice(indexOfFirstNote, indexOfLastNote)) // setting filtered values for pagination
	}

	return (
		<div className="App">
			{creatingModal && <CreatingNoteModal onCloseModal={closeModal} onCreateNote={createNote} />}
			{editingModal && <CreatingNoteModal onCloseModal={closeModal} onSaveEditedNote={updateNote} editingModal={editingModal} noteData={singleNoteData}/>}
			<div className='top-bar'>
				<h1>Welcome to the Notes App</h1>
				<input type='text' value={searchTerm} placeholder="Search..." className='searchbar' onChange={handleSearchInput}></input>
				<div className='buttons-wrapper'>
					<button className='create_note-btn' onClick={openCreateModal}>Create new note</button>
					<ExportAll data={notes}/>
				</div>
			</div>
			<div className='notes-wrapper'>
				{searchTerm === ""
					? currentNotes.map(note => <Note key={note.id} noteData={note} onDelete={deleteNote} onEdit={openEditModal} onHeartClicked={favoriteHandler} ></Note>)
					: currentSearchedValues.map(note => <Note key={note.id} noteData={note} onDelete={deleteNote} onEdit={openEditModal} onHeartClicked={favoriteHandler} ></Note>)
				}
				{/* {searchTerm==="" && currentNotes.map(note => <Note key={note.id} noteData={note} onDelete={deleteNote} onEdit={openEditModal} onHeartClicked={favoriteHandler} ></Note>)}
				{(searchTerm.length > 0) && currentSearchedNotes.map(note => <Note key={note.id} noteData={note} onDelete={deleteNote} onEdit={openEditModal} onHeartClicked={favoriteHandler} ></Note>)} */}

			</div>
			<div className='pagination-wrapper'>
				{/* <Pagination notesPerPage={notesPerPage} totalNotes={notes.length} paginate={handlePagination} /> */}
				{searchTerm === ""
					? <Pagination notesPerPage={notesPerPage} totalNotes={notes.length} paginate={handlePagination} />
					: <Pagination notesPerPage={notesPerPage} totalNotes={currentSearchedValues.length} paginate={handlePagination} />
				}
			</div>
		</div>
	);
}

export default App;
