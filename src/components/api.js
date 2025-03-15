const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-33',
    headers: {
      authorization: 'cae86374-32c8-4412-989a-b7dbfda5f7e8',
      'Content-Type': 'application/json'
    }
  }

export const getCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const getMyUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
})
    .then(res => {
        if (res.ok) {
        return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const addNewCard = (name, link) => {
    return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        link: link
    })
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const addLikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const addDislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const deleteCardMe = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const miInfo = (name, about) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: name,
            about: about,
        })
    
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}

export const addAvatar = (avatar) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatar
        }),
    })
    .then(res => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка: ${res.status}`);
      });
}