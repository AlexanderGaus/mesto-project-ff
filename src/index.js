// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу


import './index.css';
import {initialCards} from './components/cards.js'
import { addCard, like } from './components/card.js';
import { openPopup, closePopup } from './components/modal';
import { enableValidation } from 'schema-utils';
import { eenableValidation } from './components/valid';
import {getCards, getMyUser, addAvatar, addNewCard, miInfo} from "./components/api.js"

const placesList = document.querySelector('.places__list');
const profileAvatarButton = document.querySelector('.profile__image')
const profileAvatarImage = document.querySelector('.profile__image img')
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const avatarPopup = document.querySelector('.popup_type_avatar')
const editPopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');


Promise.all([getCards(), getMyUser()])
    .then(([cards, user]) => {
       const userId = user._id
       cards.forEach((card) => {
        placesList.append(addCard(card, like, openImagePopup, userId));
    
        const buttonDel = document.querySelector('.card__delete-button');
    
        if (card.owner._id !== userId) {
            buttonDel.classList.add('inactive');
        } else {
            buttonDel.classList.remove('inactive');
        }
    
        })
    })
    .catch(() => {
        console.log('')
    })

const imageLink = document.querySelector('.popup__image');
const imageName = document.querySelector('.popup__caption');

const openImagePopup = (card) => {
    elImagePopup(card);
    openPopup(imagePopup)
}

const elImagePopup = (card) => {

    imageLink.src = card.link;
    imageLink.alt = card.alt;
    imageName.textContent = card.name
}

// Валидация форм

// enableValidation({
//     formSelector: '.popup__form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__button',
//     inactiveButtonClass: 'popup__button_disabled',
//     inputErrorClass: 'popup__input_type_error',
//     errorClass: 'popup__error_visible'
//   });


const formElement = document.querySelector('.popup__form');
const popupInput = formElement.querySelector('.popup__input');

  
eenableValidation();

// form avatar

const formAvatar = document.forms['avatar'];

const linkAvatar = formAvatar.elements['link-avatar'];

const openAvatarFromSubmit = (evt) => {
    evt.preventDefault();

    const submitButton = formElement.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    const avatarSrc = linkAvatar.value

    addAvatar(avatarSrc)
        .then((res) => {
            console.log(res)
            profileAvatarImage.src = res.avatar;
            closePopup(avatarPopup)
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить'
        })

}

formAvatar.addEventListener('submit', openAvatarFromSubmit)

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

    const submitButton = formElement.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    const nameV = name.value;
    const descriptionV = description.value;

    profileTitle.textContent = name.value;
    profileDescription.textContent = description.value;

    miInfo(nameV, descriptionV)
        .then(res => {
            profileTitle.textContent = res.name;
            profileDescription.textContent = res.about;

            closePopup(editPopup);
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить'
        })


}

formEdit.addEventListener('submit', openEditFormSubmit); 


//form 2
const formImageAdd = document.forms['new-place'];
const placeName = formImageAdd.elements['place-name'];
const placeLink = formImageAdd.elements['link'];

const openimageFormSubmit = (evt) => {
    evt.preventDefault();

    const submitButton = formElement.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    const name = placeName.value;
    const link = placeLink.value

    addNewCard(name, link)
        .then((card, userId) => {
            placesList.prepend(addCard(card, like, openImagePopup, userId));


            placeName.value = '';
            placeLink.value = '';

            closePopup(cardPopup);
        })
        .catch(err => {
            console.error(err)
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить'
        })
}

formImageAdd.addEventListener('submit', openimageFormSubmit);

profileAvatarButton.addEventListener('click', () => openPopup(avatarPopup))
profileEditButton.addEventListener('click', () => openPopup(editPopup))
profileAddButton.addEventListener('click', () => openPopup(cardPopup))

const addListener = (popup) => {

    const popupClose = document.querySelectorAll('.popup__close');
    popupClose.forEach(evt => {
        evt.addEventListener('click', () => {
            closePopup(popup);
        });
    })
    
    popup.addEventListener('mousedown', (evt) => {
        if(evt.target.classList.contains('popup')) {
            closePopup(popup);
        }
    });
}

addListener(editPopup);
addListener(cardPopup);
addListener(imagePopup);
addListener(avatarPopup)














