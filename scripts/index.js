// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу




const placesList = document.querySelector('.places__list');

const addCard = (imgValue, textValue, buttonRemove) => {
    const cardTemplate = document.querySelector('#card-template').content;

    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = imgValue;
    cardElement.querySelector('.card__title').textContent = textValue;

    cardElement.querySelector('.card__like-button').addEventListener('click', () => {
       /* buttonRemove() */
        cardElement.closest('.card').remove()
        console.log('1')
    }); 

    placesList.append(cardElement);
}

/* const removeCard = (card) => {
    card.closest('.card').remove();
    console.log('remove')
} */

initialCards.forEach((name, link) => {
    addCard(link, name)
})



console.log(initialCards)




