import { createCards } from "./dom.js";

let start = 0;
const newsCounter = 10;
let btn = document.querySelector('#btn');
const mainDiv = document.querySelector('#divRow');

// Axios
axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0';

async function getValue(start, end) {
  try {
    const { data: dataId } = await axios.get('/newstories.json');
    const articleIds = dataId.slice(start, end);

    const articlePromises = articleIds.map(id => axios.get(`/item/${id}.json`));
    const articleResponses = await Promise.all(articlePromises);

    // Export data to cards
    articleResponses
      .map(response => response.data) 
      .filter(article => article !== null)
      .forEach(article => createCards(article?.title, article?.url, article?.time, mainDiv));
  } catch (error) {
    console.error("Errore:", error.message);
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `Si è verificato un errore: ${error.message}`;
    document.body.appendChild(errorMessage);
  }
}

// Load first 10 news
getValue(start, start + newsCounter);

// Button "Load more"
btn.addEventListener('click', () => {
  start += newsCounter;
  getValue(start, start + newsCounter);
});
