const express = require('express')
const cors = require('cors');
const app = express();
const db = require('./db');

app.use(cors())
app.use(express.json()) // use this to parse json data


const api = require('./queries')

app.post('/api/create',api.createNote);
app.get('/api/notes', api.getAllNotes);
app.put('/api/favorite/:id', api.favoriteNoteByID)
app.put('/api/unfavorite/:id', api.unfavoriteNoteByID)
app.put('/api/update/:id', api.updateNoteByID)
app.delete('/api/delete/:id', api.deleteNoteByID)


const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`Serve at http://localhost:${port}`);
});