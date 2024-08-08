import {APIClient, APIConfig} from '../src/index';
function createAPIClient(config: APIConfig): APIClient {
  const client = new APIClient(config.getConfig());
  return client;
}

const newConfig = new APIConfig({
  baseURL: '',
})

//Test handle query param 
//Todo
newConfig.setBaseURL("http://localhost:4000");
const client = createAPIClient(newConfig)
const checkApiGetUser = async() => {
  client.get('/user',  { 
    username: "A",
    id: "1",
    list: [0,1,2]
  })
    .then(response => {console.log(response.data)})
    .catch(error => console.error(error));
}
checkApiGetUser();


//Test Merge Header
newConfig.setHeader('Authorization', 'Bearer Token check')
const client1 = createAPIClient(newConfig);
const checkMergeHeader = async() => {
  client1.get('/user',  { 
    username: "A",
    id: "1",
  },
  {
    headers: {
      'User-Agent': 'Nghia check header'
    }
  }
)
    .then(response => {console.log(response.data)})
    .catch(error => console.error(error));
}
checkMergeHeader();

// Test api Retry
const retryApi = async() => {
  await client.get('/retry',  { 
    username: "A",
    id: "1",
    list: [0,1,2]
  },
  {
    isRetry: true,
    retries: 3,
  }
  )
    .then(response => {console.log(response)})
    .catch(error => console.error(error));
}
retryApi()

//Test formData 
const formBasic = new FormData();
formBasic.append('userName', 'FORM');
client.post('/upload', formBasic)
.then(response => {console.log('upload form:', response.data)})
.catch(error => console.error(error));

//Test formData include File
const fileData = new Blob(["text"], { type: "application/octet-stream" });;
const bodyFormData = new FormData();
bodyFormData.append('userName', 'FILE');
bodyFormData.append('file', fileData)
client.post('/send', bodyFormData, {
  headers: {
    "Content-Type": "multipart/form-data"
  }
})
.then(response => {console.log('upload file:', response.data)})
.catch(error => console.error(error));


