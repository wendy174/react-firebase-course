
import {Auth} from './components/auth'; 
import { useState, useEffect } from 'react'; 
import "./App.css"; 
import {db} from "./config/firebase"; 
import { getDocs, collection } from 'firebase/firestore' // getdocs gets info 

export function App() {
  const [movieList, setMovieList] = useState([])

  const moviesCollectionRef = collection(db,'movies') // grabs movies from db 

  useEffect(() => {  // async is needed inside useEffect to useFirebase 
      const getMovieList = async () => { 
        // read the data 
        // set movielist 
        // we will do this using getDocs 
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
  }, [])
  

  return (
    <div className="App">
      <Auth />

      <div>
        {movieList.map((movie => ( 
        <div> 
          <h1> {movie.title} </h1> 
          <p> {movie.releaseData} </p>
        </div> 
        )))}
      </div>
    </div>
  ) 
} 