import { createApp } from "vue";

import { MyComponent } from "../../src/vue";
import App from "./App.vue";

console.log(MyComponent);

const app = createApp(App);
app.component("MyComponent", MyComponent);

app.mount("#app");
