<template>
    <v-container>
      <GithubRepo @reposelected="onRepoSelected"/>
      <GithubFiles :repo="repo"/>
    </v-container>
  </template>
    
  <script>
    import GithubRepo from './GithubRepo';
    import GithubFiles from './GithubFiles.vue';
    export default {
      components: {
        GithubRepo,
        GithubFiles,
      },
      data: () => ({
        repo: null
      }),
      methods: {
        onRepoSelected(repo){
          this.repo = repo
        }
      }
    }
  </script>