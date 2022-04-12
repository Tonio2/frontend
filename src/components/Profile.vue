<template>
    <div>
        <p>Username: {{user.username}} </p>
        <img v-bind:src="user.picture" height="100" alt="Profile picture" />
        <p>mail: {{ user.email }}</p>
		<a href="/profile_update" class="btn btn-primary">Modifier</a>
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
                email: '',
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
		console.log('http://c4r1p4:3000/users/' + this.userId())
        axios.get('http://c4r1p4:3000/users/' + this.userId(), { headers: authHeader()})
            .then((response) => {
				console.log(response.data)
                this.user = response.data
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
})
</script>