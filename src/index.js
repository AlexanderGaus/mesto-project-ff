// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


import './index.css';
import {initialCards} from './components/cards.js'
import { addCard, like, openImagePopup } from './components/card.js';
import { openPopup, addListener } from './components/modal';

const placesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const editPopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const initialize = () => {
    initialCards.forEach((card) => {
        placesList.append(addCard(card, like, openImagePopup));
    })
}

initialize();

// form 1


const formEdit = document.forms['edit-profile'];
const name = formEdit.elements.name;
const description = formEdit.elements.description;

name.value = document.querySelector('.profile__title').textContent;
description.value = document.querySelector('.profile__description').textContent;

const handleFormSubmit = (evt) => {
    evt.preventDefault();

    document.querySelector('.profile__title').textContent = name.value;
    document.querySelector('.profile__description').textContent = description.value;

    editPopup.classList.remove('popup_is-opened');

}

formEdit.addEventListener('submit', handleFormSubmit); 

//form 2
const formImageAdd = document.forms['new-place'];
const placeName = formImageAdd.elements['place-name'];
const link = formImageAdd.elements['link'];

const imageFormSubmit = (evt) => {
    evt.preventDefault();
    const obj = {
        name: placeName.value,
        link: link.value,
        alt: `новая карточка ${placeName.value}`
    }

    placesList.prepend(addCard(obj, like, openImagePopup));


    placeName.value = '';
    link.value = '';

    cardPopup.classList.remove('popup_is-opened');


}

formImageAdd.addEventListener('submit', imageFormSubmit);

profileEditButton.addEventListener('click', () => openPopup(editPopup))
profileAddButton.addEventListener('click', () => openPopup(cardPopup))

addListener(editPopup);
addListener(cardPopup);
addListener(imagePopup);













