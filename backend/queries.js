const db = require('./db');


const createNote = (req, res) =>{
    var today = new Date();
	var year = today.getFullYear()
	var month = (today.getMonth() + 1)
	var day =  today.getDate()
	if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    var date = day +'/'+month+'/'+year // getting date format DD/MM/YY

    const title = req.body.title;
    const description = req.body.description;
    const created_at = date;
    const modified_at = date;
    const favorite  = "false";

    db.query("INSERT INTO notes (title, description, created_at, modified_at, favorite) VALUES (?, ?, ?, ?, ?)", 
    [title, description, created_at, modified_at, favorite], (err,result)=>{
        if(err){
            res.send(err);
        } else{
            res.send('successfully inserted 1 record!')
        }
    })
};

const getAllNotes = (req, res) => {
    db.query("SELECT * FROM notes", (err, result) => {
        res.send(result)
    })
};

const unfavoriteNoteByID = (req,res) =>{
    db.query("UPDATE notes SET favorite = 'false' WHERE id ="+req.params.id, 
    (err, result)=>{
        if(err){
            res.send(err);
        } else{
            res.send('successfully unfavorited 1 record!')
            console.log('succesfully unfavorited id - ',req.params.id)
        }
    })
}
const favoriteNoteByID = (req,res) =>{
    db.query("UPDATE notes SET favorite = 'true' WHERE id ="+req.params.id, 
    (err, result)=>{
        if(err){
            res.send(err);
        } else{
            res.send('successfully favorited 1 record!')
            console.log('succesfully favorited id - ',req.params.id)
        }
    })
}

const updateNoteByID = (req, res) =>{
    var today = new Date();
	var year = today.getFullYear()
	var month = (today.getMonth() + 1)
	var day =  today.getDate()
	if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;
    var date = day +'/'+month+'/'+year // getting date format DD/MM/YY

    const note_id = req.params.id;
    const title = req.body.title;
    const description = req.body.description;
    const modified_at = date;

    db.query("UPDATE notes SET title = ?, description = ?, modified_at = ? WHERE id = ?",
    [title, description, modified_at, note_id],
    (err, result) =>{
        if (err){
            console.log(err)
        } else {
            res.send(result)
        }
    })
}

const deleteNoteByID = (req,res)=>{
    db.query("DELETE FROM notes WHERE id = " + req.params.id,
    (err, result) => {
        if(err){
            res.send(err);
        } else{
            res.send('successfully deleted 1 record!')
        }
    })
}



module.exports = {createNote, getAllNotes, unfavoriteNoteByID, favoriteNoteByID, updateNoteByID, deleteNoteByID}