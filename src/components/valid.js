// const formElement = document.querySelector('.popup__form');
// const popupInput = formElement.querySelector('.popup__input');

const showInputError = (formElement, elem, errorMessage, config) => {
    const formError = formElement.querySelector(`.${elem.id}-error`);

    elem.classList.add(config.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(config.errorClass); // 'form__input-error_active'
};
  
const hideInputError = (formElement, elem, config) => {
    const formError = formElement.querySelector(`.${elem.id}-error`);

    elem.classList.remove(config.inputErrorClass);
    formError.classList.remove(config.errorClass); // 'form__input-error_active'
    
    formError.textContent = '';
};

const isValid = (formElement, popupInput, config) => {
    if (popupInput.validity.patternMismatch) {
        popupInput.setCustomValidity(popupInput.dataset.errorMessage);
    } else {
        popupInput.setCustomValidity("");
    }

    if (!popupInput.validity.valid) {
      showInputError(formElement, popupInput, popupInput.validationMessage, config);
    } else {
      hideInputError(formElement, popupInput, config);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
};


const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
          buttonElement.disabled = true;
      buttonElement.classList.add(config.inactiveButtonClass); //'form__submit_inactive'
    } else {
          buttonElement.disabled = false;
      buttonElement.classList.remove(config.inactiveButtonClass); //'form__submit_inactive'
    }
};

export const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, config)
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, config)

        toggleButtonState(inputList, buttonElement, config)
      });
    });
};

export const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
  
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
          })
        setEventListeners(formElement, config);
    });
};

export const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
    })

    toggleButtonState(inputList, buttonElement, config);

}