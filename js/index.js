import arr from "./gallery-items.js";

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
const listRef = document.querySelector(".js-gallery");

const createElementGallery = (arr) =>
  arr.forEach((element) => {
    const tagLi = document.createElement("li");
    tagLi.classList.add("gallery__item");

    const tagA = document.createElement("a");
    tagA.classList.add("gallery__link");
    tagA.href = element.original;

    const tagImg = document.createElement("img");
    tagImg.classList.add("gallery__image");
    tagImg.src = element.preview;
    tagImg.dataset.source = element.original;
    tagImg.alt = element.description;

    listRef.appendChild(tagLi).appendChild(tagA).appendChild(tagImg);
  });

createElementGallery(arr);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
listRef.addEventListener("click", onGalleryClick);

function onGalleryClick(event) {
  const imageRef = event.target;

  event.preventDefault();

  if (imageRef.nodeName !== "IMG") {
    return;
  }
  const urlLargerImage = imageRef.dataset.source;
  console.log(urlLargerImage);
}

// Открытие модального окна по клику на элементе галереи.
