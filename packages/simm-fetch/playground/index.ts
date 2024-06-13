import HttpClient from '../src/api-client';

const client = new HttpClient();

client.get('https://cat-fact.herokuapp.com/facts/')
  .then(response => console.log(response))
  .catch(error => console.error(error));
