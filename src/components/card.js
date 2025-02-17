
const like = (evt) => {
    evt.classList.toggle('card__like-button_is-active');
}

const addCard = (card, like, openImagePopup) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const image = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__image').alt = card.alt;
    cardElement.querySelector('.card__title').textContent = card.name;

    image.src = card.link

    const likeCard = cardElement.querySelector('.card__like-button');

    likeCard.addEventListener('click', () => like(likeCard));

    image.addEventListener('click', () => {
        openImagePopup(card);
    })

    addRemoveEventListener(cardElement); 

    return cardElement;
}


const removeCard = (card) => {
    card.closest('.card').remove();
}

const addRemoveEventListener = (cardElement) => {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        removeCard(cardElement) 
    }); 
}

export {addCard, like}