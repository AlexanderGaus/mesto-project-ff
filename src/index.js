// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


import './index.css';
import {initialCards} from './components/cards.js'
import { addCard, like } from './components/card.js';
import { openPopup, closePopup } from './components/modal';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const openImagePopup = (card) => {
    elImagePopup(card);
    openPopup(imagePopup)
}

const elImagePopup = (card) => {
    const imageLink = document.querySelector('.popup__image');
    const imageAlt = document.querySelector('.popup__image');
    const imageName = document.querySelector('.popup__caption');

    imageLink.src = card.link;
    imageAlt.alt = card.alt;
    imageName.textContent = card.name
}

const initialize = () => {
    initialCards.forEach((card) => {
        placesList.append(addCard(card, like, openImagePopup));
    })
}

initialize();

const closeSubmit = (popup) => {
    popup.classList.remove('popup_is-opened');
}


// form 1


const formEdit = document.forms['edit-profile'];
const name = formEdit.elements.name;
const description = formEdit.elements.description;

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

name.value = profileTitle.textContent;
description.value = profileDescription.textContent;

const openEditFormSubmit = (evt) => {
    evt.preventDefault();

    profileTitle.textContent = name.value;
    profileDescription.textContent = description.value;

    closeSubmit(editPopup);

}

formEdit.addEventListener('submit', openEditFormSubmit); 

//form 2
const formImageAdd = document.forms['new-place'];
const placeName = formImageAdd.elements['place-name'];
const link = formImageAdd.elements['link'];

const openimageFormSubmit = (evt) => {
    evt.preventDefault();
    const obj = {
        name: placeName.value,
        link: link.value,
        alt: `новая карточка ${placeName.value}`
    }

    placesList.prepend(addCard(obj, like, openImagePopup));


    placeName.value = '';
    link.value = '';

    closeSubmit(cardPopup);


}

formImageAdd.addEventListener('submit', openimageFormSubmit);

profileEditButton.addEventListener('click', () => openPopup(editPopup))
profileAddButton.addEventListener('click', () => openPopup(cardPopup))

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

addListener(editPopup);
addListener(cardPopup);
addListener(imagePopup);













