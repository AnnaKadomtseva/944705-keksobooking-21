'use strict';

(function () {
  const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  let photos = [];

  const PhotoOptions = {
    WIDTH: '70px',
    HEIGHT: '70px',
    BORDER_RADIUS: '5px'
  };

  const avatarPreview = document.querySelector('.ad-form-header__preview img');
  const avatarChooser = document.querySelector('#avatar');
  const photoPreview = document.querySelector('.ad-form__photo');
  const photoChooser = document.querySelector('#images');

  const loadAvatar = function () {
    const file = avatarChooser.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', function () {
        avatarPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', loadAvatar);

  const loadPhoto = function () {
    Array.from(photoChooser.files).forEach(function (file) {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', function () {
          const photo = document.createElement('img');
          photo.style.height = PhotoOptions.HEIGHT;
          photo.style.width = PhotoOptions.WIDTH;
          photo.style.borderRadius = PhotoOptions.BORDER_RADIUS;
          photo.src = reader.result;
          photoPreview.appendChild(photo);
          photos.push(photo);
        });

        reader.readAsDataURL(file);
      }
    });
  };

  photoChooser.addEventListener('change', loadPhoto);
})();
