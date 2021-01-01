import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://us-central1-ms-store-23819.cloudfunctions.net/api',
  // baseURL: 'http://localhost:5001/ms-store-23819/us-central1/api',
  //THE API (cloud function) URL
});

export default instance;
