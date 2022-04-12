<template>
    <div>
        <p>Username: {{user.username}} </p>
        <img src={{user.picture}} alt="Profile picture" />
        <p>Name: {{ user.first_name }} {{user.last_name}} </p>
        <p>mail: {{ user.mail }}</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import authHeader from '@/services/auth-header'
export default defineComponent({
    name: 'login',
    data () {
        return {
            user: {
                username: '',
                first_name: '',
                last_name: '',
                mail: '',
                picture: ''
            }
        }
    },
    methods: {
        userId() {
            let user = JSON.parse(localStorage.getItem('user') || '');
            console.log(user)
            if (user) {
                return user.id;
            } else {
                return '';
            }
        }
    },
    mounted () {
        axios.get(import.meta.env.VITE_BACKEND_URI + '/users/' + this.userId(), { headers: authHeader()})
            .then((response) => {
                this.user = response.data
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
})
</script>