<template>
    <a @click="redirect42()" class="btn btn-success">Login</a>
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
        },
		redirect42 () {
			if (import.meta.env.VITE_REDIRECT_URI) {
				const path: string = 'https://api.intra.42.fr/oauth/authorize?client_id=' + import.meta.env.VITE_CLIENT_ID + '&redirect_uri=' + encodeURIComponent(import.meta.env.VITE_REDIRECT_URI) + '&response_type=code'
				window.location.href = path
			}
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