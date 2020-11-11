import arr from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const listRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const modalButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const modalImgRef = document.querySelector(".lightbox__image");
const modalOverlayRef = document.querySelector(".lightbox__overlay");
let number = 0;

const createElementGallery = (arr) =>
  arr.forEach((element) => {
    const tagLi = document.createElement("li");
    const tagA = document.createElement("a");
    const tagImg = document.createElement("img");

    tagLi.classList.add("gallery__item");

    tagA.classList.add("gallery__link");
    tagA.href = element.original;

    tagImg.classList.add("gallery__image");
    tagImg.src = element.preview;
    tagImg.dataset.source = element.original;
    tagImg.alt = element.description;

    number += 1;
    tagImg.dataset.index = number;

    listRef.appendChild(tagLi).appendChild(tagA).appendChild(tagImg);
  });

createElementGallery(arr);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
listRef.addEventListener("click", onGalleryClick);
modalButtonRef.addEventListener("click", closeModal);
modalOverlayRef.addEventListener("click", closeModal);

function onGalleryClick(event) {
  const imageRef = event.target;

  event.preventDefault();

  if (imageRef.nodeName !== "IMG") {
    return;
  }
  const urlLargerImage = imageRef.dataset.source;
  const descriptionImage = imageRef.alt;
  const indexImage = imageRef.dataset.index;

  openModal(urlLargerImage, descriptionImage, indexImage);
}

// Открытие и закрытие модального окна по клику на элементе галереи.

function openModal(url, value, index) {
  modalRef.classList.add("is-open");

  modalImgRef.src = url;
  modalImgRef.alt = value;
  modalImgRef.dataset.index = index;

  window.addEventListener("keydown", switchImage);
  window.addEventListener("keydown", closeModalWithKey);
}

function closeModal() {
  modalRef.classList.remove("is-open");

  modalImgRef.src = "";
  modalImgRef.alt = "";
  modalImgRef.dataset.index = "";
  window.removeEventListener("keydown", closeModalWithKey);
}
// Закрытие модального окна кнопкой "Escape"
function closeModalWithKey(event) {
  if (event.code === "Escape") {
    console.log("asdas");
    closeModal();
  }
}
// переключение картинок кнопками стрелок
function switchImage(event) {
  let currentIndex = Number(modalImgRef.dataset.index);

  if (event.code === "ArrowRight") {
    if (currentIndex >= 1 && currentIndex < arr.length) {
      currentIndex += 1;
      const currentImg = document.querySelector(
        `img[data-index='${currentIndex}']`
      );

      modalImgRef.src = currentImg.dataset.source;
      modalImgRef.alt = currentImg.alt;
      modalImgRef.dataset.index = currentImg.dataset.index;
    }
  } else if (event.code === "ArrowLeft") {
    if (currentIndex <= 9 && currentIndex > 1) {
      currentIndex -= 1;
      const currentImg = document.querySelector(
        `img[data-index='${currentIndex}']`
      );

      modalImgRef.src = currentImg.dataset.source;
      modalImgRef.alt = currentImg.alt;
      modalImgRef.dataset.index = currentImg.dataset.index;
    }
  }
}
