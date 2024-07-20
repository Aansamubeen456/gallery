const getElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    return element;
  } else {
    throw new Error(
      `Please double check the element ${selector}. no such element exist.`
    );
  }
};

class Gallery {
  // constructor
  constructor(element) {
    this.container = element;
    this.list = [...element.querySelectorAll(".img")];

    //target elements from DOM
    this.modal = getElement(".modal");
    this.modalImg = getElement(".main-img");
    this.imageName = getElement(".image-name");
    this.modalImages = getElement(".modal-images");

    this.closeBtn = getElement(".close-btn");
    this.nextBtn = getElement(".next-btn");
    this.prevBtn = getElement(".prev-btn");

    // this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.chooseImages = this.chooseImages.bind(this);
    this.nextImage = this.nextImage.bind(this);
    this.previousImage = this.previousImage.bind(this);

    //    container event
    this.container.addEventListener(
      "click",
      function (e) {
        const result = e.target.classList.contains("img");

        if (result) {
          this.openModal(e.target, this.list);
        }
      }.bind(this)
    );
  }

  //    Open Modal method
  openModal(selectedImage, list) {
    this.setMainImage(selectedImage);
    const modalImages = list
      .map((img) => {
        return `<img
            src="${img.src}"
            title="${img.title}"
            data-id="${img.dataset.id}"
              class="${
                selectedImage.dataset.id === img.dataset.id
                  ? "modal-img selected"
                  : "modal-img"
              }"
            alt="${img.title}"
          />`;
      })
      .join("");
    this.modalImages.innerHTML = modalImages;

    this.modal.classList.add("open");
    this.closeBtn.addEventListener("click", this.closeModal);
    this.modalImages.addEventListener("click", this.chooseImages);
    this.nextBtn.addEventListener("click", this.nextImage);
    this.prevBtn.addEventListener("click", this.previousImage);
  }

  //    setMainImage method
  setMainImage(selectedImage) {
    this.modalImg.src = selectedImage.src;
    this.imageName.textContent = selectedImage.title;
  }

  //   close modal method
  closeModal() {
    this.modal.classList.remove("open");
  }

  //   choose image method
  chooseImages(e) {
    if (e.target.classList.contains("modal-img")) {
      const selected = this.modalImages.querySelector(".selected");
      selected.classList.remove("selected");

      this.setMainImage(e.target);
      e.target.classList.add("selected");
    }
  }

  nextImage() {
    const selected = this.modalImages.querySelector(".selected");
    const next =
      selected.nextElementSibling || this.modalImages.firstElementChild;
    selected.classList.remove("selected");
    this.setMainImage(next);
    next.classList.add("selected");
  }
  previousImage() {
    console.log("prev btn");
    const selected = this.modalImages.querySelector(".selected");
    const prev =
      selected.previousElementSibling || this.modalImages.lastElementChild;
    selected.classList.remove("selected");
    this.setMainImage(prev);
    prev.classList.add("selected");
  }
}

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
