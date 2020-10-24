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
document.addEventListener("keydown", closeModalWithKey);

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

  // document.addEventListener("keydown", switchImage);
}

function closeModal() {
  modalRef.classList.remove("is-open");

  modalImgRef.src = "";
  modalImgRef.alt = "";
}

function closeModalWithKey(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

// function switchImage(event) {
//   if (event.code === "ArrowRight") {
//     let newIndex = Number(modalImgRef.dataset.index);
//     newIndex += 1;

//     console.log(newIndex);
//   } else if (event.code === "ArrowLeht") {
//   }
// }
