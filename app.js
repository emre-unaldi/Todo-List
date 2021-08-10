const inputKutusu = document.querySelector(".inputBox input");
const ekleButonu = document.querySelector(".inputBox button");
const todoListe = document.querySelector(".todoList");
const temizleButonu = document.querySelector(".footer button");

inputKutusu.onkeyup = ()=>{
  let girisDegeri = inputKutusu.value;
   if(girisDegeri.trim() != 0){ 
      ekleButonu.classList.add("active"); 
   }else{
      ekleButonu.classList.remove("active"); 
   }
}
gorevleriGoruntule(); 


// var creationTime = `
// (${date.getHours()} : ${date.getMinutes()} : ${date.getSeconds()})  - 
// (${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()})
// `;

ekleButonu.onclick = ()=>{
   var date = new Date();
   var creationTime = `
   (${date.getDate()} / ${date.getMonth()+1} / ${date.getFullYear()}  ${date.getHours()} : ${date.getMinutes()})
   `;
  let girisDegeri = inputKutusu.value +" - "+ creationTime;
  let getLocalStorage = localStorage.getItem("Todos"); 
   if(getLocalStorage == null){ 
      listArray = []; 
   }else{
      listArray = JSON.parse(getLocalStorage);  //json dizesini bir js nesnesine dönüştürmek
   }
      listArray.push(girisDegeri); 
      localStorage.setItem("Todos", JSON.stringify(listArray)); // js nesnesini bir json dizgisine dönüştürmek
      gorevleriGoruntule(); 
      ekleButonu.classList.remove("active"); 
}

function gorevleriGoruntule(){
  let getLocalStorage = localStorage.getItem("Todos");
   if(getLocalStorage == null){
      listArray = [];
   }else{
      listArray = JSON.parse(getLocalStorage); 
   }
      const eklenenTodoSayisi = document.querySelector(".todoTasks");
      eklenenTodoSayisi.textContent = listArray.length;
         if(listArray.length > 0){ 
            temizleButonu.classList.add("active"); 
         }else{
            temizleButonu.classList.remove("active"); 
         }
            let newLiTag = "";
            listArray.forEach((element, index) => {
               newLiTag += `
                  <li>${element}
                  <span class="icon-trash" onclick="gorevSil(${index})">
                  <i class="fas fa-trash-alt"></i>
                  </span>
                  <span class="icon-update" onclick="gorevDuzenle(${index})">
                  <i class="fas fa-pencil-alt"></i>
                  </span>
                  </li>
                  `;
            });
               todoListe.innerHTML = newLiTag; 
               inputKutusu.value = ""; 
}


function gorevSil(index){
  let getLocalStorage = localStorage.getItem("Todos");
  listArray = JSON.parse(getLocalStorage);
  listArray.splice(index, 1);
  localStorage.setItem("Todos", JSON.stringify(listArray));
  gorevleriGoruntule();
}

function gorevDuzenle(index){
   let getLocalStorage = localStorage.getItem("Todos");
   listArray = JSON.parse(getLocalStorage);
   degistir = listArray.splice(index, 1);
   console.log(degistir);
      var parcala = degistir[0].split("-")
      localStorage.setItem("Todos", JSON.stringify(listArray));
      gorevleriGoruntule(); 
      inputKutusu.value = parcala[0];
      console.log(parcala[0]);
}


temizleButonu.onclick = ()=>{
  let getLocalStorage = localStorage.getItem("Todos"); 
   if(getLocalStorage == null){ 
      listArray = []; 
   }else{
      listArray = JSON.parse(getLocalStorage);  //json dizesini bir js nesnesine dönüştürmek
      listArray = []; //boş bir dizi oluştur
   }
      localStorage.setItem("Todos", JSON.stringify(listArray)); // öğeyi localstorage'da ayarla
      gorevleriGoruntule(); 
}
   