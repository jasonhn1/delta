//Load data.json


function loadImages(data) {

    //Gets query param from url
    const urlSearchParams = new URLSearchParams(window.location.search);
    const type = urlSearchParams.get('type');

    console.log(type);
    const paramData = data[type]['urls'];
    const folderImgPath = type.split(' ').join('_')

    // Create repeating elements
    const parentElement = document.getElementById("image-container");    

    const nameElement = document.getElementById("name");
    nameElement.textContent = type;

    
    const intoTextElement = document.getElementById("intro-text");
    intoTextElement.textContent += type.toLocaleLowerCase();
    intoTextElement.textContent += " projects";


    paramData.forEach((imageName) => {

        const img = document.createElement("img"); // create img element
        const itemDiv = document.createElement("div");
        const linkDiv = document.createElement("div");
        const textDiv = document.createElement("div");

        itemDiv.classList.add('service-item-lg');
        linkDiv.classList.add('service-link-lg');


        itemDiv.appendChild(linkDiv);
        linkDiv.appendChild(textDiv);
        linkDiv.appendChild(img);
        console.log(imageName)

        img.setAttribute("data-src", `images/service/${folderImgPath}/${imageName}`); // set data-src attribute
        img.setAttribute("src", `images/thumbnails/loading.gif`); // set src attribute
        img.setAttribute("class", "lazyload"); // set class attribute
        img.setAttribute("alt", type); // set alt attribute

        if(folderImgPath==="Sidewalks" || folderImgPath==="Steps"){
          img.classList.add('side-img-size');

        }else{
          img.classList.add('img-size');

        }

        parentElement.appendChild(itemDiv);
    });

    // Call Lazy load
    var lazyLoad = new LazyLoad();
}

document.addEventListener("DOMContentLoaded", function() {
    const navbarToggler = document.querySelector(".navbar-toggler");
    const navbarCollapse = document.querySelector(".navbar-collapse");
  
    function handleResize() {
      if (window.innerWidth <= 991) {
        navbarCollapse.addEventListener("click", handleClick);
      } else {
        navbarCollapse.removeEventListener("click", handleClick);
      }
    }
  
    function handleClick(event) {
      if (event.target.tagName === "A") {
        navbarToggler.click(); // Simulate click on the navbar toggler to close the menu
      }
    }
  
    // Initial execution based on window size
    handleResize();
  
    // Execute the function on window resize
    window.addEventListener("resize", handleResize);
  });

document.addEventListener("DOMContentLoaded", function() {
    const scrollLinks = document.querySelectorAll(".scrollLink");
    let offset = 164; // Default offset value
  
    function setOffset() {
      if (window.innerWidth <= 680) {
        offset = 115; // Adjusted offset value for window size 680 or less
      } else {
        offset = 164; // Default offset value for larger window size
      }
    }
  
    // Call setOffset function initially and on window resize
    setOffset();
    window.addEventListener("resize", setOffset);
  
    scrollLinks.forEach(function(link) {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const topOffset = target.getBoundingClientRect().top + window.pageYOffset - offset;
  
        window.scrollTo({ top: topOffset, behavior: 'smooth' });
      });
    });
  });

window.onload = function () {


    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "data.json", true);
    xhttp.responseType = "json";

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myData = this.response;
            loadImages(myData);
        }
    };
    xhttp.send();
}

// get query param value for "type"
// load the data.json file
// cast the file data into map
// get data where the key is the value for "type" above.
// generate the repeat elements for each image url in the map
// find the div with the id "image-container"
// add the newly generated elements into that div
// call lazyload function to init the image loading when image is in the view port (ie lazyload())