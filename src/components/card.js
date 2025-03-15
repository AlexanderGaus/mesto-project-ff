import {addLikeCard, addDislikeCard, deleteCardMe} from "./api.js"

const like = (likeBtn, cardId, countLike) => {
    const isLiked = likeBtn.classList.contains('card__like-button_is-active');
    const likeSelect = isLiked ? addDislikeCard : addLikeCard;

    likeSelect(cardId) 
        .then((card) => {
            likeBtn.classList.toggle("card__like-button_is-active");
            countLike.textContent = card.likes.length;
        })
        .catch (err => console.log(err));
}

const addCard = (card, like, openImagePopup, userId) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    const image = cardElement.querySelector('.card__image');
    image.alt = card.alt;
    cardElement.querySelector('.card__title').textContent = card.name;
    const countLike = cardElement.querySelector('.count-like');
    countLike.textContent = card.likes.length;

    image.src = card.link;

    if (card.owner._id === userId) {
        addRemoveEventListener(cardElement, card._id); 
    } else {
        const deleteCard = cardElement.querySelector('.card__delete-button');
        deleteCard.remove();
    }

    const likeCard = cardElement.querySelector('.card__like-button');

    likeCard.addEventListener('click', () => {
        like(likeCard, card._id, countLike);
    });


    const isLiked = card.likes.some((like) => like._id === userId);
    if (isLiked) {
        likeCard.classList.add("card__like-button_is-active");
    }


    image.addEventListener('click', () => {
        openImagePopup(card);
    })

    return cardElement;
}


const removeCard = (card, cardId) => {
    deleteCardMe(cardId)
    .then(() => {
        card.remove()
    })
}

const addRemoveEventListener = (cardElement, cardId) => {
    cardElement.querySelector('.card__delete-button').addEventListener('click', () => {
        removeCard(cardElement, cardId) 
    }); 


}

export {addCard, like}