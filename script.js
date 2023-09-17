// veriable decleration's
let serinput=document.getElementById("search-inpt");
let serbtn=document.getElementById("search-btn");
let fooditemcont=document.getElementById("food-item-cont");
let semorebtn=document.getElementsByClassName('semorebtn');
let displonclck=document.getElementById("disponclck");
let hrt=document.getElementsByClassName('hrt');
let favcntd=document.getElementById("fav-count");
let favcont=document.getElementById("fav-cont");
let tohmaff=document.getElementById("tp-hem-icomn");
let body = document.querySelector('body');
let randomImageNumber = Math.floor(Math.random() * 7); 
body.style.backgroundImage = `url(${randomImageNumber}.jpg)`; 



// arrays need to store food item data from api 
let fooditems=[];
let fav=[];
let temp=[];
let fevcount=0;

// const div = document.querySelector('div');

// document.addEventListener("click", (e) => {
  
// })


// search button key handler event listener and function

serinput.addEventListener('keyup',search);

function search(){
   console.log(serinput.value);
 let url="https://www.themealdb.com/api/json/v1/1/search.php?s=";
 url=url+serinput.value;
 console.log(url);
 let response=fetch(url);
 response.then((v)=>{
     return v.json();
 }).then((food)=>{
     console.log("search function invoked");
     console.log(food);
     for(let i=0;i<food.meals.length;i++){
      fooditems.push(food.meals[i]);
     }
     console.log(fooditems);
     renderfooditem()
 }).catch((error) => {
  fooditems=[];
  fooditemcont.innerHTML=`<h1 class="text-light p-5">Nothing found please search again</h1>"`;
 
});
}

//evetn listener when some on the click on the  cross icon
serbtn.addEventListener('click',()=>{
  serinput.value="";
})

//function to rander food item on the screen
function renderfooditem(){
  let ihtml=""
  fooditemcont.innerHTML="";
  
  
   for(let i=0;i<fooditems.length;i++){
     ihtml+=
     `
     <div class="card crd" style="width: 18rem; mx-2 my-2" id=${fooditems[i].idMeal}>
     <img src=${fooditems[i].strMealThumb} class="card-img-top" alt="...">
     <div class="card-body">
     <div class="d-flex justify-content-between align-items-center">

     <h5 class="card-title">${fooditems[i].strMeal}</h5>
     <a type="submit class="text-danger bg-danger text-decoration-none "><i  class="fa-regular fa-heart fa-2xl hrt"></i> </a>
  
     </div>
       
       <div class="d-flex justify-content-between">
         <p>${fooditems[i].strArea}</p>
         <p>${fooditems[i].strCategory}</p>
       </div>
       <p class="card-text">${fooditems[i].strInstructions.substring(0, 100)}<span class="fw-bold">...</span></p>
       <div class="d-flex justify-content-between align-items-center">
         <a  class="btn btn-primary semorebtn bg-dark ">See More</a>
         <div><a class="text-dark text-decoration-none fw-bold "  target="_blank" href="${fooditems[i].strYoutube}" type="submit">Video:&nbsp;<i class=" text-danger  fa-brands fa-youtube fa-2xl"></i></a></div>
       </div>
     </div>
     
   </div>

     `
   }
   
   temp=fooditems;
   fooditems=[];
   console.log(temp)
   fooditemcont.innerHTML=ihtml;
   fav.forEach(favoriteItem => {
    const cardId = favoriteItem.idMeal;
    updateHeartIconColor(cardId);
  });

   for(let i=0;i<semorebtn.length;i++){
    semorebtn[i].addEventListener('click',()=>{
      const cardId = event.target.closest('.card').getAttribute('id');
      console.log("See More button clicked for card with ID:", cardId);
       let addele=""
       for(let i=0;i<temp.length;i++){
        if(cardId==parseInt(temp[i].idMeal)){
          let ingredient=""
            for(let j=1;j<21;j++){
              let ing="strIngredient"+j;
              let qnt="strMeasure"+j;
              if(temp[i][ing]!=""){
                ingredient += temp[i][ing] +" "+ temp[i][qnt]+", ";
              }
            }
            console.log(ingredient);
            document.body.style.overflow = "hidden";
            document.body.style.paddingLeft = "5px";
             addele+=
             `
 <div class="card-screen bg-dark shadow text-light pb-5">
 <div class="d-flex justify-content-between ">
  <div class="d-flex">
    <div class="mt-2 shadow rounded">
      <img class="km-img shadow"src="${temp[i].strMealThumb}">
    </div>
    <div class="p-1 ms-3">
      <h3  class="p-1"> <span class="fw-bold"> Dish: </span> ${temp[i].strMeal}</h3>
      <h5 class="p-1"> <span class="fw-bold"> Area: </span>${temp[i].strArea}</h5>
      <h5 class="mb-2 p-1"> <span class="fw-bold"> Category: </span>${temp[i].strCategory}</h5> 
      <h5 class=" p-1"> <span class="fw-bold"> Dish Ingredient: </span><p>${ingredient}<p></h5>
    </div>
</div>

<div class="d-flex p-2">


 <a type="submit" class="text-light" id="cross-det"><i class="fa-solid fa-xmark fa-2xl"></i></a>
 
</div>
</div>
<div>
 <p class="pt-2  ingpara"><span class="fw-bold">Dish Instructions:- </span> Int${temp[i].strInstructions} </p> 
</div>
<div class="d-flex justify-content-center ">
  <a href="${temp[i].strYoutube}" target="_blank" class="p-2 text-decoration-none  rounded fw-bold bg-white text-black border border-black shadow-lg " type="submit">Watch <i class="text-danger fa-brands fa-youtube fa-2xl"></i> </a>
</div>
</div>
             
 `
        }
       
       }
      displonclck.innerHTML=addele;
     document.getElementById('cross-det').addEventListener('click',()=>{
     console.log("eleemet has been clicked")
     displonclck.innerHTML="";
     document.body.style.overflowY = "scroll";
     document.body.style.paddingLeft = "0px";
   })



    });
  }

 for(let i=0;i<hrt.length;i++){
  hrt[i].addEventListener('click',()=>{
   
    if(hrt[i].style.color != "red"){
      hrt[i].style.color = "red";
      console.log(hrt[i]);
      fevcount+=1;
      favcntd.innerHTML=fevcount;
      const cardId = event.target.closest('.card').getAttribute('id');
      removeFromFavorites(cardId);
      console.log("See More button clicked for card with ID:", cardId);
      for(let k=0;k<temp.length;k++){
         if(cardId==parseInt(temp[k].idMeal)){
         
             fav.push(temp[k])
         }
         addToFavorites(cardId);
      }
    }else{
      hrt[i].style.color = "";
      if(fevcount>=0){
        fevcount-=1;
        favcntd.innerHTML=fevcount;
        }
      const cardId = event.target.closest('.card').getAttribute('id');
      console.log("See More button clicked for card with ID:", cardId);
      for(let k=0;k<temp.length;k++){
        if(cardId==parseInt(temp[k].idMeal)){
            fav.pop(temp[k])
        }
     }

   //  renderfav();
     
    }
   
  });
 }
   
  
}

//interval to check and show weather something is search by use or not 
setInterval(()=>{
  if(serinput.value==""){
    fooditems=[];
    fooditemcont.innerHTML=`<h1 class="text-light p-5">No Food Found PLease enter keyword to search</h1>"`;
 }
},500)

//event listener  to check weater fav containe is visible or not
tohmaff.addEventListener("click",ckkrrenr);

let isvisible=false;
//function to chech visibility
function ckkrrenr(){
  if(isvisible==false){
    renderfav()
  }else{
    favcont.style.visibility = "hidden";
    isvisible=false;
    document.body.style.overflow = "";

  } 
}

//function to rander favon the fav containter

function renderfav(){
  let ihtml=""
  fav.innerHTML="";
  
  
   for(let i=0;i<fav.length;i++){
     ihtml+=
     `
     <div class="card crd fav-crd" style="width: 18rem; mx-2 my-2" id=${fav[i].idMeal}>
     <img src=${fav[i].strMealThumb} class="card-img-top" alt="...">
     <div class="card-body">
     <div class="d-flex justify-content-between align-items-center">

     <h5 class="card-title">${fav[i].strMeal}</h5>
     <a type="submit class="text-danger bg-danger text-decoration-none "><i class=" favfavtrt text-danger fa-regular fa-heart fa-2xl hrt"></i> </a>
  
     </div>
       
       <div class="d-flex justify-content-between">
         <p>${fav[i].strArea}</p>
         <p>${fav[i].strCategory}</p>
       </div>
       <p class="card-text">${fav[i].strInstructions.substring(0, 100)}<span class="fw-bold">...</span></p>
       <div class="d-flex justify-content-between align-items-center">
         <a  class=" btn btn-primary semorebtn  fav-seemore-btn bg-dark ">See More</a>
         <div><a class="text-dark text-decoration-none fw-bold "  target="_blank" href="${fav[i].strYoutube}" type="submit">Video:&nbsp;<i class=" text-danger  fa-brands fa-youtube fa-2xl"></i></a></div>
       </div>
     </div>
     
   </div>

     `
   }
   
   console.log(fav)
   favcont.innerHTML=ihtml;
   favcont.style.visibility = "visible";
   document.body.style.overflow = "hidden";
   document.body.style.paddingLeft = "5px";
   isvisible=true;

  const favHeartIcons = document.querySelectorAll('.favfavtrt');

    favHeartIcons.forEach((heartIcon, index) => {
    heartIcon.addEventListener('click', () => {
      
     console.log(`Favorite icon clicked for item ${index}`);
     const cardId = event.target.closest('.card').getAttribute('id');
     removeFromFavorites(cardId);
     console.log("See More button clicked for card with ID:", cardId);
     fav = fav.filter(item => item.idMeal !== cardId);
     updateHeartIconColor(cardId)
    renderfav();
    //  if(fevcount>=0){
    //  fevcount-=1;
    //  favcntd.innerHTML=fevcount;
    //  }
    });
  });
 
     

}

//function to update the heart color when someone add or remove the item into the fav
function updateHeartIconColor(cardId) {
  const mainHeartIcons = document.querySelectorAll('.hrt');
     console.log(mainHeartIcons);
  mainHeartIcons.forEach((heartIcon) => {
    const iconCardId = heartIcon.closest('.card').getAttribute('id');
    
    if (iconCardId === cardId) {
      if (heartIcon.style.color === "red") {
        heartIcon.style.color = "";
      } else {
        heartIcon.style.color = "red";
      }
    }
  });
}

//functions and event listener to make visible of the fav see more modal visible when some one click on it
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('fav-seemore-btn')) {
      const cardId = event.target.closest('.card').id;
      openFavoriteModal(cardId);
      console.log("see more button were clicked in fav")
  }
});

function openFavoriteModal(cardId) {
  const favModal = document.getElementById('fav-modal');
  const closeBtn = favModal.querySelector('.close');
  const modalContent = favModal.querySelector('.modal-content');

  
  const favoriteItem = fav.find(item => item.idMeal === cardId);
       console.log(favoriteItem)
   if (favoriteItem) {
    let ingredient=""
    for(let j=1;j<21;j++){
      let ing="strIngredient"+j;
      let qnt="strMeasure"+j;
      if(favoriteItem[ing]!=""){
        ingredient += favoriteItem[ing]+" "+ favoriteItem[ing]+", ";
      }
    }
      modalContent.innerHTML = `
      <div class="card-screen-fav bg-dark shadow text-light ">
      <div class="d-flex justify-content-between ">
       <div class="d-flex">
         <div class="mt-2 shadow rounded">
           <img class="km-img-fav shadow"src="${favoriteItem.strMealThumb}">
         </div>
         <div class="p-1 ms-3">
           <h3  class="p-1"> <span class="fw-bold"> Dish: </span> ${favoriteItem.strMeal}</h3>
           <h5 class="p-1"> <span class="fw-bold"> Area: </span>${favoriteItem.strArea}</h5>
           <h5 class="mb-2 p-1"> <span class="fw-bold"> Category: </span>${favoriteItem.strCategory}</h5> 
           <h5 class=" p-1"> <span class=""> Dish Ingredient: </span><p class="fs-5">${ingredient}<p></h5>
         </div>
     </div>
     
     <div class="d-flex p-2">
     
     
      <a type="submit" class="text-light" id="cross-det"><i class="fa-solid fa-xmark fa-2xl"></i></a>
      
     </div>
     </div>
     <div>
      <p class="pt-2 fs-5"><span class="fw-bold">Dish Instructions:- </span> Int${favoriteItem.strInstructions} </p> 
     </div>
     <div class="d-flex justify-content-center p-2">
       <a href="${favoriteItem.strYoutube}" target="_blank" class="p-2 text-decoration-none  rounded bg-white  text-dark border border-black shadow-lg " type="submit">Watch <i class="text-danger fa-brands fa-youtube fa-2xl"></i> </a>
     </div>
     </div>
      `;

    
      favModal.style.display = 'block';

   
      closeBtn.addEventListener('click', function () {
          favModal.style.display = 'none';
      });

      window.addEventListener('click', function (event) {
          if (event.target === favModal) {
              favModal.style.display = 'none';
          }
      });
  }


  document.getElementById("cross-det").addEventListener('click',()=>{
      favModal.style.display = 'none';
  })
}


//function to add fav item  to the local storage
function addToFavorites(cardId){
   const selectedFoodItem = temp.find(item => item.idMeal === cardId);
   
  if (!fav.some(item => item.idMeal === cardId) ) {
      fav.push(selectedFoodItem);
      localStorage.setItem('favorites', JSON.stringify(fav));
      
  }
 const storedFavorites = localStorage.getItem('favorites');
 if(storedFavorites){
      fav = JSON.parse(storedFavorites);
      
  const uniqueFavorites = [...new Set(fav.map(item => item.idMeal))].map(id => {
    return fav.find(item => item.idMeal === id);
  });

  localStorage.setItem('favorites', JSON.stringify(uniqueFavorites));
}
}

//function to rannder favourite item when the page load from the local storage
document.addEventListener('DOMContentLoaded', function () {
  const storedFavorites = localStorage.getItem('favorites');
  
  if (storedFavorites) {
      fav = JSON.parse(storedFavorites);
      
  }

  fav.forEach(favoriteItem => {
    const cardId = favoriteItem.idMeal;
    updateHeartIconColor(cardId);
  });
  
  fevcount = fav.length; 
  favcntd.innerHTML=fevcount;
});


//function to remove item from the fav list from the local storage

function removeFromFavorites(cardId) {
  console.log('Removing from favorites:', cardId);

  
  const indexToRemove = fav.findIndex(item => item.idMeal === cardId);
  console.log('Index to remove:', indexToRemove);

  if (indexToRemove !== -1) {
    fav.splice(indexToRemove, 1);
    console.log('Updated fav array:', fav);

    
    localStorage.setItem('favorites', JSON.stringify(fav));
    console.log('Updated local storage:', localStorage.getItem('favorites'));
     
    fevcount = fav.length; 
    favcntd.innerHTML = fevcount; 
  }
 

}


