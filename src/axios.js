import axios from "axios";

const instance = axios.create({
  baseURL: "https://amazon-stripe-api.herokuapp.com/api",
  // "http://localhost:5001/clone-b8bad/us-central1/api" API Cloud Function firebase url
});

export default instance;
