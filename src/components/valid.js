const formElement = document.querySelector('.popup__form');
const popupInput = formElement.querySelector('.popup__input');

const showInputError = (formElement, elem, errorMessage) => {
    const formError = formElement.querySelector(`.${elem.id}-error`);

    elem.classList.add('form__input_type_error');
    formError.textContent = errorMessage;
    formError.classList.add('form__input-error_active');
};
  
const hideInputError = (formElement, elem) => {
    const formError = formElement.querySelector(`.${elem.id}-error`);

    elem.classList.remove('form__input_type_error');
    formError.classList.remove('form__input-error_active');
    
    formError.textContent = '';
};

const isValid = (formElement, popupInput) => {
    if (popupInput.validity.patternMismatch) {
        popupInput.setCustomValidity(popupInput.dataset.errorMessage);
    } else {
        popupInput.setCustomValidity("");
    }

    if (!popupInput.validity.valid) {
      showInputError(formElement, popupInput, popupInput.validationMessage);
    } else {
      hideInputError(formElement, popupInput);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = document.querySelector('.popup__button')
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement)

        toggleButtonState(inputList, buttonElement)
      });
    });
};
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add('form__submit_inactive');
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove('form__submit_inactive');
    }
};

export const eenableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
  
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          })
        setEventListeners(formElement);
    });
};