<template>
    <a href="https://api.intra.42.fr/oauth/authorize?client_id=1b76e904ee2ce7b315874791153354bf72a8dbc6da6dbf702d10846edbc04728&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2F&response_type=code
" class="btn btn-success">Login</a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import router from '../router'

export default defineComponent({
    name: 'login',
    methods: {
        parseJwt (token: any) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            return JSON.parse(jsonPayload);
        }
    },
    mounted() {
        let code = window.location.search
        if (code)
        {
            axios.post('http://localhost:3000/test', {code: code.substring(6)})
                .then((response: any) => {
                    if (response.data) {
                        console.log(response.data)
                        localStorage.setItem('user', JSON.stringify(response.data));
                        router.push('/profile')
                    }
                })
                .catch((errors) => {
                    console.log(errors)
                    router.push('/')
                })
        }
    }
})
</script>