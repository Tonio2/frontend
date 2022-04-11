<template>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username" name="username" />
        <label for="username">mail</label>
        <input type="text" id="mail" v-model="user.mail" name="mail" />
        <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import axios from 'axios'
import router from '../router'
import authHeader from '@/services/auth-header'
export default defineComponent({
    name: 'profile_update',
    data () {
        return {
            user: {
                username: '',
                mail: ''
            }
        }
    },
    methods: {
        userId() {
            let user = JSON.parse(localStorage.getItem('user') || '');
            if (user) {
                return user.id;
            } else {
                return '';
            }
        },
        saveTutorial() {
            let data = {
                username: this.user.username,
                mail: this.user.mail
            }
            axios.put('http://localhost:3000/users/' + this.userId(), { headers: authHeader(), ...data})
                .then((response) => {
                    router.push('/profile')
                })
                .catch((e: Error) => {
                    console.log(e);
                })
        }
    },
    mounted () {
        axios.get('http://localhost:3000/users/' + this.userId(), { headers: authHeader()})
            .then((response) => {
                this.user = response.data
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
})
</script>