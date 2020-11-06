'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const HEADER_PREVIEW = `img/muffin-grey.svg`;

const PhotoOptions = {
  WIDTH: 70,
  HEIGHT: 70,
  BORDER_RADIUS: 5
};

const avatarChooser = document.querySelector(`.ad-form__field input[type=file]`);
const avatarPreview = document.querySelector(`.ad-form-header__preview img`);
const photoChooser = document.querySelector(`.ad-form__upload input[type=file]`);
const photoPreview = document.querySelector(`.ad-form__photo`);

const changeUserPhoto = (result) => {
  avatarPreview.src = result;
};

const changeTypePhoto = (result) => {
  const photo = document.createElement(`img`);
  photo.src = result;
  photo.width = PhotoOptions.WIDTH;
  photo.height = PhotoOptions.HEIGHT;
  photo.style.borderRadius = `${PhotoOptions.BORDER_RADIUS}px`;
  photoPreview.appendChild(photo);
};

const loadImage = (element, action) => {
  const file = element.files[0];

  if (file) {
    const fileName = file.name.toLowerCase();

    const selectFileType = FILE_TYPES.some((item) => {
      return fileName.endsWith(item);
    });

    if (selectFileType) {
      const reader = new FileReader();

      reader.addEventListener(`load`, (evt) => {
        action(evt.target.result);
      });

      reader.readAsDataURL(file);
    }
  }
};

const onAvatarChange = () => {
  loadImage(avatarChooser, changeUserPhoto);
};
const onPhotoChange = () => {
  loadImage(photoChooser, changeTypePhoto);
};

avatarChooser.addEventListener(`change`, onAvatarChange);
photoChooser.addEventListener(`change`, onPhotoChange);

const removeImage = () => {
  avatarPreview.src = HEADER_PREVIEW;
  const typePhotos = photoPreview.querySelectorAll(`img`);
  if (typePhotos) {
    typePhotos.forEach((item) => {
      item.remove();
    });
  }
};

window.image = {
  remove: removeImage
};
