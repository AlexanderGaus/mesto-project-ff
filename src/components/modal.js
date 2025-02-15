
const openPopup = (popup) => {

    popup.classList.add('popup_is-opened');
    popup.classList.add('popup_is-animated');
    popup.focus()
    popup.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
            closePopup(popup);
        }
    })
}

const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    popup.removeEventListener('keydown',() => closePopup(popup));
}

const addListener = (popup) => {

const popupClose = document.querySelectorAll('.popup__close');
popupClose.forEach(evt => {
    evt.addEventListener('click', () => {
        closePopup(popup);
    });
})

// const popupClose = document.querySelector('.popup__close');
// popupClose.addEventListener('click', () => {
//         closePopup(popup);
//     });

popup.addEventListener('mousedown', (evt) => {
    if(evt.target.classList.contains('popup')) {
        closePopup(popup);
    }
});
}


export {openPopup, addListener}