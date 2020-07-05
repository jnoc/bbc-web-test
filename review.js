const main = document.querySelector('main');
const button = document.querySelector('button');
const section = document.querySelector('section');
let count = -1;
let myReq = new XMLHttpRequest();

document.onload = load();

function load() {
    const reList = ['1','2','3','4','5'];
    /*
    -- could not work out async so moved to count

    button.onclick = function getData(){
      for (let i = 1; i < 6; i++){
          let jVar = 'article' + reList[i];
          let jStr = document.getElementById(jVar).value;
          let jRes = JSON.stringify({jVar: {rating: jStr}});
      }
    }*/
    button.onclick = function getData(){
        count += 1;
        if (count <= 4){
            let jVar = 'article' + reList[count];
            let jStr = document.getElementById(jVar).value;
            let out = jVar + ": {rating : " + jStr + "}"
            section.textContent += out + "\r\n" ;
        }

        /* not completely sure how POST works since I believe
           you need a recieving site to get the request */
        myReq.open('POST', "", true);
        myReq.onload = function (){
            if (myReq.status === 200) {
                console.log(myReq.response);
            }
            else{
                console.log(myReq.response);
            }
        myReq.send(section.innerHTML);
        }
    }
}


/* -- Pushed for time so switched to html for form.

-- version 2 failed

function pushForm(rating) {
    const form = document.createElement('form');
    for(let i = 0; i < rating.length; i++){
      const select = document.createElement('select');
      const option = document.createElement('option');
      let value = "Please choose an option";
      option.textContent = value;
      //select.appendChild(option);
      //option.setAttribute("id", "up");
      //if (document.getElementById("!")){

      //}
      for (j = 0; j < rating.length; j++){
          value = rating[i];
          const optAns = document.createElement('option');
          optAns.textContent = value;
          select.appendChild(optAns.cloneNode());
          optAns.setAttribute("value", value);
      }
      form.appendChild(select);
    }
    main.appendChild(form);
}

-- version 1 failed

  function pushForm(reList, rating){
    for(let i = 0; i < reList.length; i++){
      const div = document.createElement('div');
      const input = document.createElement('input');
      const form = document.createElement('form');
      const label = document.createElement('label');

      let forA = 'a' + reList[i];
      let labT = "Article " + reList[i]

      label.setAttribute("for", forA);
      label.textContent = labT;
      div.appendChild(label);
      for (let j = 0; j < rating.length; j++){
          div.appendChild(input);
          let r = rating[j];
          input.setAttribute("type", 'radio');
          input.setAttribute("name", forA);
          input.setAttribute("id", r);
      }
    }
    form.appendChild(div);
    main.appendChild(form);
}
*/
