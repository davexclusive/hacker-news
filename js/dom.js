/* Create cards and add it in the container */

export function createCards(title, url, timeUnix, mainDiv) {
  const milliseconds = timeUnix * 1000;
  const humanDateFormat = new Date(milliseconds).toLocaleString();

  const cardHTML = `
    <div class="col-lg-3 card-design m-2">
      <div class="card-body border-card m-3">
        <h5 class="card-title color-title">${title}</h5>
        <p class="card-text">${humanDateFormat}</p>
        <a href="${url}" target="_blank">
          <button class="btn btn-outline-dark btn-rounded button-mod">Read more</button>
        </a>
      </div>
    </div>
  `;
  mainDiv.innerHTML += cardHTML;

  
}