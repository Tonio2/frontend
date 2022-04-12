<template>
    <div>
        <label for="username">Username</label>
        <input type="text" id="username" v-model="user.username" name="username" /><br />
        <label for="username">mail</label>
        <input type="text" id="mail" v-model="user.email" name="mail" /><br />
		<label>Picture</label>
		<input type="file" ref="file" />
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
                email: '',
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
			form_data.append('data', data)
			form_data.append('file', this.$refs.file.files[0])
			for(var pair of form_data.entries()) {
				console.log(pair[0]+ ', '+ pair[1]);
			}
			let header = authHeader()
			header['Content-type'] = 'multipart/form-data'
            axios.put('http://c4r1p4:3000/users/' + this.userId(), form_data, { headers: header})
                .then((response) => {
                    router.push('/profile')
                })
                .catch((e: Error) => {
                    console.log(e);
                })
        }
    },
    mounted () {
        axios.get('http://c4r1p4:3000/users/' + this.userId(), { headers: authHeader()})
            .then((response) => {
                this.user = response.data
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }
})
</script>