<template>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username" name="username" /><br />
		<img v-bind:src="user.picture" height="100" /><br />
		<label>Picture</label>
		<input type="file" ref="file" /><br />
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
                picture: '',
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
                email: this.user.email
            }
			let form_data = new FormData()
			form_data.append('username', this.user.username)
			form_data.append('email', this.user.email)
			form_data.append('file', this.$refs.file.files[0])
			for(var pair of form_data.entries()) {
				console.log(pair[0]+ ', '+ pair[1]);
			}
			let header = authHeader()
			header['Content-type'] = 'multipart/form-data'
            axios.post(import.meta.env.VITE_BACKEND_URI + '/users/' + this.userId(), form_data, {headers: authHeader()})
                .then((response) => {
                    router.push('/profile')
                })
                .catch((e: Error) => {
                    console.log(e);
                })
        }
    },
    mounted () {
		let user = JSON.parse(localStorage.getItem('user'))
		if (!user.profile_completed)
		{
			this.user.username = user.username
			this.user.picture = user.picture
		}
		else
		{
			axios.get(import.meta.env.VITE_BACKEND_URI + '/users/' + this.userId(), { headers: authHeader()})
            .then((response) => {
                this.user.username = response.data.username
				this.user.picture = response.data.picture
            })
            .catch((e: Error) => {
                console.log(e);
            });
		}
        
    }
})
</script>