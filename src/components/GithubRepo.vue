<template>
    <div>
      <v-row class="text-center">
        <v-col cols="2" v-if="user">
        <v-avatar><img :src='avatar'></v-avatar>
      </v-col>
        <v-col cols="5">
          <v-autocomplete
          v-model="user"
          label="Find your user"
          :items="userlist"
          :loading="userloading"
          :search-input.sync="usersearch"
          item-text="login"
        />
        </v-col>
        <v-col cols="5">
          <v-select
            v-model="repo"
            :items="repolist"
            :loading="repoloading"
            item-text="name"
            label="Select the repository"
            return-object
            single-line
          ></v-select>
        </v-col>
      </v-row>
    </div>
  </template>
  
  <script>
  
    import {api} from '~api'
    import {debouncerdecorator} from '@/helpers/debouncer.js'
  
    export default {
      data: () => ({
        user: null,
        repo: null,
        usersearch: null,
        userlist: [],
        repolist: [],
        userloading: false,
        repoloading: false,
        avatar: null
      }),
      methods: {
        searchGithubUsers: debouncerdecorator(async function () {
          this.userloading = true
          const data = await api.searchUsers(this.usersearch)
          this.userlist = data.items
          this.avatar = this.userlist.map(user => user.avatar_url)
          this.userloading = false
        }, 500),
        async listGithubRepositories(){
          this.repoloading = true
          const data = await api.listRepositories(this.user)
          this.repolist = data
          this.repoloading = false
        }
      },
      watch: {
        usersearch () {
          this.searchGithubUsers()
        },
        user() {
          if(this.user){
            this.listGithubRepositories()
          }
        },
        repo () {
          this.$emit('reposelected', this.repo)
        }
      }
    }
  </script>