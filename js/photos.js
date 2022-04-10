const IMAGE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
const avatarPhoto = document.querySelector('.user-avatar');
const avatarChooser = document.querySelector('.ad-form-header__input');
const adPhoto = document.querySelector('img.ad-form__photo');
const adChooser = document.querySelector('.ad-form__input');

const uploadAvatarPhoto = () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    avatarPhoto.src = URL.createObjectURL(file);
  }
};

const uploadAdPhoto = () => {
  const file = adChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = IMAGE_TYPES.some((type) => fileName.endsWith(type));
  if (matches) {
    adPhoto.src = URL.createObjectURL(file);
  }
};

export const setPhotosPreview = () => {
  avatarChooser.addEventListener('change', uploadAvatarPhoto);
  adChooser.addEventListener('change', uploadAdPhoto);
};
