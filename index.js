const header = document.querySelector('header');
const article = document.querySelector('article');
const button = document.querySelector('button');
let count = 0;
let myReq = new XMLHttpRequest();
//  /assets/BBC/data/

const artLi = [
  '/assets/BBC/data/article-1.json',
  '/assets/BBC/data/article-2.json',
  '/assets/BBC/data/article-3.json',
  '/assets/BBC/data/article-4.json',
  '/assets/BBC/data/article-5.json'
]

document.onload = getArticle(artLi[0]);
document.onload = next();

function next(){
  button.onclick = function bCount(){
      count += 1;
      if (count <= 4){
        header.innerHTML = "";
        article.innerHTML = "";
        getArticle(artLi[count]);
      }
      else{
        console.log("done");
        window.location.href = "review.html"
        // change back to /assets/BBC/review.html for github pages
      }
  }
}

function getArticle(url) {
    myReq.open('GET', url, true);
    myReq.onerror = function () {
      alert("Error: Please check your connection and refresh.");
    }
    myReq.responseType = 'json';
    myReq.send();
}

myReq.onload = function(){
    const data = myReq.response;
    pushHead(data);
    pushArticle(data);
}

function pushHead(jData){
    const title = document.createElement('h1');
    title.textContent = jData['title'];
    header.appendChild(title);
}

function pushArticle(jData){
    const body = jData['body'];
    for (let i = 0; i < body.length; i++){
      // create elements
      const section = document.createElement('section');
      const h2 = document.createElement('h2');
      const p = document.createElement('p');
      const img = document.createElement('img');
      const ul = document.createElement('ul') //unordered

      // check for object and then set the content to element
      
      if (body[i].type == "heading"){
          h2.textContent = body[i].model.text;
          section.appendChild(h2);
      }
      if (body[i].type == "paragraph"){
          p.textContent = body[i].model.text;
          section.appendChild(p)
      }
      if (body[i].type == "image"){
          let iSrc = body[i].model.url;
          let iAlt = body[i].model.altText;
          let iH = body[i].model.height;
          let iW = body[i].model.width;
            // probably can be shortend but pushed for time
          let iStyle = "height:" + iH + "px; width:" + iW + "px;";
          section.appendChild(img);
          img.setAttribute("src", iSrc);
          img.setAttribute("alt", iAlt);
          img.setAttribute("style", iStyle);
      }
      if (body[i].type == "list"){
          const amount = body[i].model.items;
          if(body[i].model.type == "unordered"){
              for(j = 0; j < amount.length; j++){
                  const li = document.createElement('li');
                  li.textContent = amount[j];
                  ul.appendChild(li);
                  section.appendChild(ul);
              }
          }
          else{
            // other types of list code
          }
      }
      article.appendChild(section);
    }
}
