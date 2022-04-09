<template>
    <div>
        <p>Username: {{user.username}} </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
export default defineComponent({
    name: 'login',
    data () {
        return {
            user: {
                username: ''
            }
        }
    },
    methods: {
        authHeader() {
            let token = JSON.parse(localStorage.getItem('token') || '');
            console.log(token)
            if (token) {
                return { Authorization: 'Bearer ' + token };
            } else {
                return { Authorization: ''};
            }
        },
        userId() {
            let user_id = JSON.parse(localStorage.getItem('user_id') || '');
            console.log(user_id)
            if (user_id) {
                return user_id;
            } else {
                return '';
            }
        }
    },
    mounted () {
        axios.get('http://localhost:3000/users/' + this.userId(), { headers: this.authHeader()})
            .then((response) => {
                console.log(response.data)
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
})
</script>