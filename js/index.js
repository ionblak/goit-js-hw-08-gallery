import arr from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const listRef = document.querySelector(".js-gallery");
const modalRef = document.querySelector(".js-lightbox");
const modalButtonRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const modalImgRef = document.querySelector(".lightbox__image");
const modalOverlayRef = document.querySelector(".lightbox__overlay");

const createElementGallery = (item, index) => {
  const galleryItemRef = document.createElement("li");
  galleryItemRef.classList.add("gallery__item");

  const galleryLinkRef = document.createElement("a");
  galleryLinkRef.classList.add("gallery__link");
  galleryLinkRef.setAttribute("href", item.original);

  const galleryImgRef = document.createElement("img");
  galleryImgRef.classList.add("gallery__image");
  galleryImgRef.setAttribute("src", item.preview);
  galleryImgRef.setAttribute("data-source", item.original);
  galleryImgRef.setAttribute("data-index", index);
  galleryImgRef.setAttribute("alt", item.description);

  galleryLinkRef.appendChild(galleryImgRef);
  galleryItemRef.appendChild(galleryLinkRef);
  listRef.appendChild(galleryItemRef);

  return galleryItemRef;
};

const galleryItems = arr.map((item, index) =>
  createElementGallery(item, index)
);
listRef.append(...galleryItems);

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
    if (currentIndex >= 0 && currentIndex < arr.length - 1) {
      currentIndex += 1;
      const currentImg = document.querySelector(
        `img[data-index='${currentIndex}']`
      );

      modalImgRef.src = currentImg.dataset.source;
      modalImgRef.alt = currentImg.alt;
      modalImgRef.dataset.index = currentImg.dataset.index;
    }
  } else if (event.code === "ArrowLeft") {
    if (currentIndex <= 9 && currentIndex > 0) {
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
