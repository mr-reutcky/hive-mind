'use strict';

import { select, selectAll, listen } from './utils.js';

const API_URL = 'https://randomuser.me/api/?nat=CA&results=10&seed=same';

const options = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  },
  mode: 'cors'
};

async function getUsers() {
  try {
    const response = await fetch(API_URL, options);

    if (!response.ok) {
      throw new Error(`${response.statusText} (${response.status})`);
    }

    const data = await response.json();
    const users = data.results;

    return users;
  } catch (error) {
    console.log(error.message);
  }
}

async function main() {
  const users = await getUsers();

  if (users) {
    populateConnections(users); 
  }
}

const contactCards = selectAll('.connection-box'); 

function populateConnections(users) {

  users.forEach((user, index) => {
    if (contactCards[index]) {
      
      // Not working with utility function due to scope
      // Declared inside function due to multiple identical elements
      const contactName = contactCards[index].querySelector('.contact-name');
      const contactLocation = contactCards[index].querySelector('.contact-location');
      const contactImage = contactCards[index].querySelector('.contact-profile');

      contactName.textContent = `${user.name.first} ${user.name.last}`;
      contactLocation.textContent = `${user.location.city}`;
      contactImage.src = user.picture.medium; 
      contactImage.alt = `${user.name.first} ${user.name.last}`;
    }
  });
}

main();
