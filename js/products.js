import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';


createApp({
    data() {
      return {
        apiUrl: 'https://vue3-course-api.hexschool.io/v2',
        apiPath: 'winter_',
        products: [],
        temp_product: {},
      }
    },
    methods: {
        checkLogin() {
            const url = `${this.apiUrl}/api/user/check`;
            axios.post(url)
                .then(() => {
                    console.log("getData");
                    this.getData();
                })
                .catch((error) => {
                    alert(error.response.data.message)
                    window.location = 'login.html';
                })
            },
        getData() {
            const url = `${this.apiUrl}/api/${this.apiPath}/admin/products`;
            axios.get(url)
                .then((response) => {
                    this.products = response.data.products;
                })
                .catch((error) => {
                    alert(error.response.data.message);
                })
            },
    },
    mounted() {
        // Token
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin()
    }
  }).mount('#app');