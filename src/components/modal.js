const closePopupByEsc = (evt) => {
    if (evt.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup);
    }
}

const openPopup = (popup) => {

    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByEsc)
}

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByEsc);
}


export {openPopup, closePopup}