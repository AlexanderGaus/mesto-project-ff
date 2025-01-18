// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу




const placesList = document.querySelector('.places__list');

const addCard = (card) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    addRemoveEventListener(cardElement); 

    placesList.append(cardElement);
}

const removeCard = (card) => {
    card.closest('.card').remove();
}

const addRemoveEventListener = (cardElement) => {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        removeCard(cardElement) 
    }); 
}

const initialize = () => {
    initialCards.forEach((card) => {
        addCard(card);
    })
}

initialize();



