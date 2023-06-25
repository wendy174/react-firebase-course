
import {Auth} from './components/auth'; 
import { useState, useEffect } from 'react'; 
import "./App.css"; 
import {db} from "./config/firebase"; 
import { getDocs, collection, addDoc, deleteDoc, doc} from 'firebase/firestore' // getdocs gets all info 

export function App() {
  const [movieList, setMovieList] = useState([])

  // new movie state 
  const [newMovieTitle, setNewMovieTitle] = useState('')
  const [newReleaseDate, setNewReleaseDate ] = useState(0)
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false)

  const [updatedTitle, setUpdatedTitle] = useState('')

  console.log(newReleaseDate)

  const moviesCollectionRef = collection(db,'movies') // specify which collection you want data from 

  // getMovies is inside of use effect because we need async notation 
// async is needed inside useEffect to useFirebase 
const getMovieList = async () => { 
  // read the data 
  // set the movie list 
  try  { 
  const data = await getDocs(moviesCollectionRef)
  const filteredData = data.docs.map((doc) => (
    {...doc.data(), 
    id: doc.id
  }))
  setMovieList(filteredData)
  } catch (err) { 
    console.error(err)
  }
}

const updateMovieTitle = 

const deleteMovie = async (id) => {
  const movieDoc = doc(db, 'movies', id);
  try {
    await deleteDoc(movieDoc);
    getMovieList(); // Refresh the movie list after deletion
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {  
  getMovieList(); 
}, [])

const onSubmitMovie = async () => { 
  try { 
  await addDoc(moviesCollectionRef, {
    title: newMovieTitle, 
    releaseDate: newReleaseDate, 
    receivedAnOscar: isNewMovieOscar
  })

    getMovieList(); 
  } catch(err) { 
    console.error(err)
  }
}


  return (
    <div className="App">
      <Auth />
    
      <hr></hr>
      <div>
        <h1>Submit Movie</h1>
        <input placeholder ='Movie title...' onChange = {(e) => setNewMovieTitle(e.target.value)}/> 
        <input placeholder ='Release Data...' type ='number' onChange = {(e) => setNewReleaseDate(Number(e.target.value))}/> 
        <input type='checkbox' onChange = {(e) => setIsNewMovieOscar(e.target.checked)} />
        <label> Received an Oscar </label> 
        <button onClick={onSubmitMovie}> Submit Movie </button> 
      </div>
      <div>
        {movieList.map((movie => ( 
        <div> 
          <hr></hr>
          <h1> {movie.title} </h1> 
          <p> {movie.releaseDate} </p>
          <button onClick= {() => deleteMovie(movie.id)}> Delete Movie </button>
          <input placeholder = 'new title' onchange = {(e) => setUpdatedTitle(e.target.value)}/>
          <button>Update Title</button>
        </div> 
        )))}
      </div>
    </div>
  ) 
} 