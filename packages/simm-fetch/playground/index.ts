import { patch } from '../src/api-client'

console.log('playground work')

patch('https://jsonplaceholder.typicode.com/users/1', {
  username: 'lapdq'
}, {
}).then(response => {
  console.log(response)
}).catch(error => {
  console.log(error)
})

