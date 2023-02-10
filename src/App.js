import {useState, useRef, useEffect} from 'react';
import { AgGridReact } from 'ag-grid-react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBook from './AddBook';

import './App.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [books, setBooks] = useState([]);
  const gridRef = useRef();

  const columnDefs = [
    {field: 'title'},
    {field: 'author'},
    {field: 'year'},
    {field: 'isbn'},
    {field: 'price'},
    {
      field: 'id',
      headerName: '',
      width: '80',
      sortable: false,
      filter: false,
      cellRendererFramework: (params) =>
        <IconButton onClick={() => deleteBook(params.value)} >
          <DeleteIcon fontSize="small" color="error" />
        </IconButton>
    },
  ];

  useEffect(() => {
    fetchItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchItems = () => {
    fetch('https://bookstore-faf28-default-rtdb.europe-west1.firebasedatabase.app/books.json')
    .then(response => response.json())
    .then(data => addKeys(data))
    .catch(err => console.error(err))
  }

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valueKeys = Object.values(data).map((item, index) => 
    Object.defineProperty(item, 'id', {value: keys[index]}));
    setBooks(valueKeys);
  }

  const addBook = (newBook) => {
    fetch('https://bookstore-faf28-default-rtdb.europe-west1.firebasedatabase.app/books.json',
    {
      method: 'POST',
      body: JSON.stringify(newBook)
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const deleteBook = (id) => {
    fetch(`https://bookstore-faf28-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
    {
      method: 'DELETE',
    })
    .then(response => fetchItems())
    .catch(err => console.error(err))
  }

  const defaultColDef = ()=> (
    {
      sortable: true,
      filter: true
    }
  );

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">
            Bookstore
          </Typography>
        </Toolbar>
      </AppBar>
      <AddBook addBook={addBook} /> 
      <div className="ag-theme-material" style={{width: 'auto', height: 600, margin: 'auto'}}>
        <AgGridReact 
            ref={gridRef}
            rowData={books} columnDefs={columnDefs}
            animateRows={true} rowSelection='multiple'
            defaultColDef={defaultColDef}/>
      </div>
    </div>
  );
}

export default App;