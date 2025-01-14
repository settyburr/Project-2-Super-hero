import React, { useState, useRef } from "react";
import { retrieveSeries } from "../api/marvelAPI";
import { MarvelCharacter } from "../interfaces/HeroData";
import sound from "../assets/backgroundSound/theme.ogg";
import ErrorPage from "./ErrorPage";
import spiderman from "../assets/images/spidermanjacket.jpg"

const SeriesPage = () => {
   // State to handle the search term, character data, loading, and errors
 const [searchTerm, setSearchTerm] = useState('');
 const [character, setCharacter] = useState<MarvelCharacter | null>(null);
 const [series, setSeries] = useState<string[]>([]);
 const [loading, setLoading] = useState<boolean>(false);
 const [error, setError] = useState<string | null>(null);
 const [isPlaying, setIsPlaying] = useState(false); // To track audio play state
 const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to the audio element

 // Function to handle the search term change
 const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   setSearchTerm(event.target.value);
 };
 // Toggle audio play/pause when the "Play Sound" button is clicked
 const toggleAudioPlayback = () => {
  if (audioRef.current) {
      if (isPlaying) {
          audioRef.current.pause();
      } else {
          audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
  }
};

 // Function to handle the search button click
 const handleSearchClick = async () => {
   if (!searchTerm) return; // Don't fetch if search term is empty

   setLoading(true);
   setError(null); // Reset error state before fetching

   try {
     const data = await retrieveSeries(searchTerm);
   
     if (data.series && data.series.length > 0) {
       let characterData = data; // Assuming the first character is the desired one
       setCharacter(characterData);
       characterData = characterData.series.map((character: { name: object; resourceURI: object}) => {
         return character.name + "%" + character.resourceURI;
       })
       setSeries(characterData);
     } else {
       setError('Character not found.');
     }
   } catch (err) {
     setError('An error occurred while fetching data.');
   } finally {
     setLoading(false);
   }
 };
 return (
   <div>
     <h1>Marvel Series Search</h1>
      {/* Audio controls */}
      <div>
                <button onClick={toggleAudioPlayback}>
                    {isPlaying ? 'Pause Sound' : 'Avengers Assemble'}
                </button>
                <audio ref={audioRef} preload="auto" loop>
                    <source src={sound} type="audio/ogg" />
                </audio>
            </div>
     {/* Search bar */}
     <input
       type="text"
       placeholder="Search for a Marvel char..."
       value={searchTerm}
       onChange={handleSearchChange}
     />
     
     {/* Search button */}
     <button onClick={handleSearchClick}>Search</button>

     {/* Show loading state */}
     {loading && <p>Loading...</p>}

     {/* Show error message */}
     {error && <ErrorPage />}

     {/* Show character details if available */}
     {character && !loading && !error && (
       <div>
         <h2>{character.name}</h2>
         <p>{character.description || 'No description available.'}</p>

         <h3>Series:</h3>
         <ul>
           {series.length > 0 ? (
             series.map((series, index) => {
               return <li key={index}>{series.split("%")[0]}</li>
             })
           ) : (
             <p>No series available for this character.</p>
           )}
         </ul>
       </div>
     )}
     {/* Add temp image to the Aside part of the page */}
     <aside>
       <div className="containerImage">
         <img src={spiderman} alt="Spiderman Image"/>
       </div>
     </aside>
   </div>
 );
};


export default SeriesPage;
