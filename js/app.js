const API = require('./api');

API
  .getMedia(20)
  .then((res) => {
    res.json().then((body) => {
      if (!body || body.meta.code !== 200) {
        const errorMsg = body.meta.error_message || '';
        console.log('API error: %o', errorMsg);
      }

      const media = body.data || {};
      let html = '';
      media.forEach((item) => {
        html += createItemElement(item);
      });

      let mainWrapper = document.getElementById('mainWrapper');
      mainWrapper.innerHTML = html;

      addListeners();
    })
  });

function createItemElement (item) {
  const id = item.id;
  const userName = item.user.username;
  const avatar = item.user.profile_picture;
  const place = item.location ? item.location.name : '';
  const likesCount = item.likes.count;
  const date = item.created_time;
  const caption = item.caption.text;
  const imgUrl = item.images.low_resolution.url;

  return `
    <div class='itemWrapper'>
      <div class="headerWrapper">
        <div class="headerInner">
          <div>
            <img class="avatar" src=${avatar}>
          </div>
          <span class="userInfo">
            <span class="name">${userName}</span><br />
            <span class="place">${place}</span>
          </span>
          <span class="date">${date}</span> 
        </div>
      </div>
      <div class="imageWrapper"><img class="image" src="${imgUrl}"></div>
      <div class="footerWrapper">
        <div class="footerInner">
          <hr class="line">
          <div class="likes" data-id="${id}">
            &#x2661; ${likesCount}
           </div>
          <div class="caption">${caption}</div>
        </div>
      </div>
    </div>
  `;
}

function addListeners () {
  document.body.addEventListener('click', showAlert);
}

function showAlert (e) {
  if (e.target.className === 'likes') {
    const id = e.target.dataset.id;
    alert(id);
  }
}