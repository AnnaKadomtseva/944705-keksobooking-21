'use strict';

(function () {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  const HEADER_PREVIEW = 'img/muffin-grey.svg';

  const PhotoOptions = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  const avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  const photoChooser = document.querySelector('.ad-form__upload input[type=file]');
  const photoPreview = document.querySelector('.ad-form__photo');

  const changeUserPhoto = function (result) {
    avatarPreview.src = result;
  };

  const changeTypePhoto = function (result) {
    const photo = document.createElement('img');
    photo.src = result;
    photo.width = PhotoOptions.WIDTH;
    photo.height = PhotoOptions.HEIGHT;
    photo.style.borderRadius = PhotoOptions.BORDER_RADIUS + 'px';
    photoPreview.appendChild(photo);
  };

  const loadImage = function (element, action) {
    const file = element.files[0];

    if (file) {
      const fileName = file.name.toLowerCase();

      const selectFileType = FILE_TYPES.some(function (item) {
        return fileName.endsWith(item);
      });

      if (selectFileType) {
        const reader = new FileReader();

        reader.addEventListener('load', function (evt) {
          action(evt.target.result);
        });

        reader.readAsDataURL(file);
      }
    }
  };

  const onUserPhotoChange = function () {
    loadImage(avatarChooser, changeUserPhoto);
  };
  const onTypePhotoChange = function () {
    loadImage(photoChooser, changeTypePhoto);
  };

  avatarChooser.addEventListener('change', onUserPhotoChange);
  photoChooser.addEventListener('change', onTypePhotoChange);

  const removeImage = function () {
    avatarPreview.src = HEADER_PREVIEW;
    const typePhotos = photoPreview.querySelectorAll('img');
    if (typePhotos) {
      typePhotos.forEach(function (item) {
        item.remove();
      });
    }
  };

  window.image = {
    remove: removeImage
  };
})();
