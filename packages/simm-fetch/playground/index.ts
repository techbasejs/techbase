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

const checkApiGetUserWithArrayParamsBracket = async() => {
  client.get('/user',  {
    username: "A",
    id: "1",
    list: [0, null, 2],
    address: null,
    phone: undefined,
  }, {
    queryConfig: {
      arrayFormat: 'bracket',
      skipNull : true,
      sort: false,
    }
  })
    .then(response => {console.log(response.data)})
    .catch(error => console.error(error));
}


const checkApiGetUserWithArrayParams = async() => {
  client.get('/user',  {
    username: "A",
    id: "1",
    list: [0,1,2],
    address: null,
    phone: undefined,
  }, {
    queryConfig: {
      arrayFormat: 'index',
      skipNull : true,
      sort: false
    }
  })
    .then(response => {console.log(response.data)})
    .catch(error => console.error(error));
}
checkApiGetUserWithArrayParamsBracket();

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

const newConfig2 = new APIConfig({
  baseURL: 'https://jsonplaceholder.typicode.com/',
})
const client2 = createAPIClient(newConfig2)
const testHandleRequestSuccess = async () => {
  await client2.post("/posts", { title: "foo", body: "bar", userId: 1 },{
    headers: {
      'Content-Type': 'application/json',
    },

  } ).then(response => {console.log(response?.data)}).catch(error => {console.error(error)});
}

testHandleRequestSuccess();

// testHook
const url = new APIConfig({
  baseURL: 'https://api.example.com',
  hooks: {
    beforeRequest: [
      (config) => {
        config.baseURL = 'https://jsonplaceholder.typicode.com'
        config.timeout = 30_000
        config.headers = {
          ...config.headers,
          'Authorization': 'Bearer Token Asdfedw23123',
          'Content-Type': 'application/json',
        };
        return config
      }
    ],
    afterResponse: [
      (response) => {
        if (response.statusText === 'OK') {
          console.log(response.data);
        }
        return response
      }
    ],
    beforeError: [
      (error) => {
        if (error.response?.status === 400) {
          console.log(error);
        }
        return error
      }
    ]
  }
})

const clientHook = createAPIClient(url);
const testGetMethod = async () => {
  await clientHook.get('/comments', {postId: 1}, {
    headers: {
      'Custom-header': 'new header'
    }
  }).then(response => {console.log(response)}).catch(error => {console.error(error)});
}
testGetMethod();
