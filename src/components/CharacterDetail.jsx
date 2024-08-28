import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useParams } from 'react-router-dom';
import './CharacterDetail.css';

const CharacterDetail = () => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams(); 

  const publicKey = '3a55aeef83f55cc3123bf3f66a454253';
  const privateKey = '8aaf49a22ce44e482f233043e2d6083f7264b81b';
  const baseURL = 'https://gateway.marvel.com/v1/public/characters';
  const ts = new Date().getTime();
  const hash = md5(ts + privateKey + publicKey);

  function md5(string) {
    return CryptoJS.MD5(string).toString();
  }
 
  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${baseURL}/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`
        );
        setDetails(response.data.data.results[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, publicKey, hash]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return details ? (
    <div className="character-detail">
      <h2>{details.name}</h2>
      <p>{details.description || 'No description available'}</p>
      <h3>Comics:</h3>
      <ul>
        {details.comics.items.map(comic => (
          <li key={comic.resourceURI}>{comic.name}</li>
        ))}
      </ul>
    </div>
  ) : <p>No details available</p>;
};

export default CharacterDetail;
