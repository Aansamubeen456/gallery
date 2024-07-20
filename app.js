const gallery = [
  {
    id: 1,
    title: "city-1",
    class: "city",
  },
  {
    id: 2,
    title: "city-2",
    class: "city",
  },
  {
    id: 3,
    title: "city-3",
    class: "city",
  },
  {
    id: 4,
    title: "city-4",
    class: "city",
  },
  {
    id: 5,
    title: "city-5",
    class: "city",
  },
  {
    id: 6,
    title: "nature-1",
    class: "nature",
  },
  {
    id: 7,
    title: "nature-2",
    class: "nature",
  },
  {
    id: 8,
    title: "nature-3",
    class: "nature",
  },
];
// get elements
const getElements = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  }
  throw new Error(
    `.the element ${selector} you are trying to access does not exist`
  );
};

// select elements
const nature = getElements(".nature");
const city = getElements(".city");
const closeBtn = getElements(".close-btn");
const modal = getElements(".modal");
const mainImg = getElements(".main-img");
const modalImgs = getElements(".modal-images");

//1- display the gallery when windows load
window.addEventListener("DOMContentLoaded", () => {
  displayImg("nature", nature);
  displayImg("city", city);

  const imgs = document.querySelectorAll(".img");
  imgs.forEach((img) => {
    img.addEventListener("click", (e) => {
      const element = e.currentTarget;
      const elementID = parseInt(e.currentTarget.dataset.id);

      mainImg.setAttribute("src", `./images/img-${elementID}.jpeg`);

      const className = element.getAttribute("class").slice(4);
      displayModalImg(className, modalImgs, elementID);
      //   console.log(className);

      modal.classList.add("open");
      closeBtn.addEventListener("click", () => {
        modal.classList.remove("open");
      });
    });
  });
});

// 2- select the element on which user click

// **********
// functions
// *********

// 1-display gallery image according to it's type

function displayImg(type, sectionName) {
  const images = gallery.filter((item) => {
    if (item.class === type) {
      return item;
    }
  });
  //   console.log(natureGallery);
  let imgElements = images
    .map((item) => {
      return `<img
        src="./images/img-${item.id}.jpeg"
        title="${item.title}"
        class="img ${item.class}"
        data-id="${item.id}"
        alt="${item.title}"
      />`;
    })
    .join("");
  sectionName.innerHTML = imgElements;
}

// 2- display modal images

function displayModalImg(type, sectionName, id) {
  const images = gallery.filter((item) => {
    if (item.class === type) {
      return item;
    }
  });

  //   console.log(natureGallery);
  let imgElements = images
    .map((item) => {
      return `<img
        src="./images/img-${item.id}.jpeg"
        title="${item.title}"
        class="modal-img"
        data-id="${item.id}"
        alt="${item.title}"
      />`;
    })
    .join("");

  sectionName.innerHTML = imgElements;

  const modalImages = document.querySelectorAll(".modal-img");
  modalImages.forEach((img) => {
    const imgID = parseInt(img.dataset.id);
    if (imgID === id) {
      img.classList.add("selected");
    }

    img.addEventListener("click", (e) => {
      e.currentTarget.classList.add("selected");

      modalImages.forEach((img) => {
        if (img !== e.currentTarget) {
          img.classList.remove("selected");
        }
      });
      mainImg.setAttribute(
        "src",
        `./images/img-${e.currentTarget.dataset.id}.jpeg`
      );
    });
  });
}
