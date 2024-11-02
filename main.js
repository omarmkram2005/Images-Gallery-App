// declare all variables
let ourCollection = document.getElementById("our-collection");
let Upload = document.getElementById("chose-imgs");
let fullScreenImg = document.getElementById("fullscreenimg");
let previewImage = document.getElementById("previewImage");
let imgsInput = document.getElementById("imgsInput");
let addImgs = document.querySelector(".add-imgs");
let displayImgs = document.querySelector(".display-imgs");
let items = document.querySelector(".items");

// add click event on ourCollection button
ourCollection.addEventListener("click", () => {
  // remove the main screen and display the gallery screen
  addImgs.style.display = "none";
  displayImgs.style.display = "block";

  // add click events on imgs
  addEvents();
});

// make the upload imgs button click the hidden input
Upload.onclick = () => {
  imgsInput.click();
};

// get the imgs the user uploaded
imgsInput.addEventListener("change", () => {
  // clear the default gallery
  items.innerHTML = "";

  // limit the imgs count by 25
  if (imgsInput.files.length <= 25) {
    Array.from(imgsInput.files).forEach((element, index) => {
      // make the HTML img tag and its div container
      let container = document.createElement("div");
      container.className = "item";
      let img = document.createElement("img");
      img.className = "itemImage";
      container.appendChild(img);
      items.appendChild(container);

      let reader = new FileReader();
      reader.readAsDataURL(element);
      reader.onload = function (event) {
        // get imgs full name and add it to the img source
        img.src = event.target.result;

        // get the first img and add it to the preview as default
        if (index == 0) {
          previewImage.src = event.target.result;

          // remove the main screen and display the gallery screen
          addImgs.style.display = "none";
          displayImgs.style.display = "block";
        }
      };
    });
  } else {
    // sweetalert error if the img count more than 25
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "You cannot upload more than 25 images!",
    });
  }

  // add click events on imgs
  addEvents();
});

// the click events on imgs
function addEvents() {
  // make the clicked img the preview
  Array.from(document.querySelectorAll(".itemImage")).forEach((img) => {
    img.addEventListener("click", () => {
      window.scrollTo(0, 0);

      previewImage.src = img.src;
    });
  });
}

// make the clicked preview fullscreen
previewImage.onclick = () => {
  fullScreenImg.src = previewImage.src;
  document.querySelector(".fullscreen").style.display = "block";

  // add functionality to close icon
  document.querySelector(".close").addEventListener("click", () => {
    document.querySelector(".fullscreen").style.display = "none";
  });
};
