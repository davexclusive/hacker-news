import { createCards } from "./dom.js";

let start = 0;
const newsCounter = 10;
let btn = document.querySelector('#btn');
const mainDiv = document.querySelector('#divRow');

// Axios
axios.defaults.baseURL = 'https://hacker-news.firebaseio.com/v0';

async function getValue(start, end) {
  try {
    const response = await axios.get('/newstories.json');
    const dataId = response.data;

    const articleIds = dataId.slice(start, end);

    for (let id of articleIds) {
      const articleResponse = await axios.get(`/item/${id}.json`);
      const article = articleResponse.data;

      if (article) {
        createCards(article.title, article.url, article.time, mainDiv);
      }
    }
  } catch (error) {
    console.error("Error:", error.message);
    const errorMessage = document.createElement('div');
    errorMessage.textContent = `An error occurred: ${error.message}`;
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


