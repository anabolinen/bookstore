import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

function AddBook(props) {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({description: '', date: '', priority: ''});

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSave = () => {
    props.addBook(book);
    handleClose();
  }

  const inputChanged = (event) => {
    setBook({...book, [event.target.name]: event.target.value});
  }

  return(
    <div>
      <Button variant="outlined" color="primary" onClick={handleOpen}>
        Add book
      </Button>
     <Dialog open={open}>
       <DialogTitle>New book</DialogTitle>
       <DialogContent> 
         <TextField
            name="description"
            value={book.description}
            onChange={inputChanged}
            margin="dense"
            label="Description"
            fullWidth
          /> 
         <TextField
           name="date"
           value={book.date}
           onChange={inputChanged}
           margin="dense"
           label="Date"
           fullWidth
         /> 
         <TextField
           name="priority"
           value={book.priority}
           onChange={inputChanged}
           margin="dense"
           label="Priority"
           fullWidth
         /> 
      </DialogContent>
      <DialogActions>
         <Button color="primary" onClick={handleClose}>Cancel</Button>
         <Button color="primary" onClick={handleSave}>Save</Button>
      </DialogActions>
     </Dialog> 
    </div>
  );
}

export default AddBook;