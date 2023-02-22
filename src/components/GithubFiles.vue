<template>
  <v-container>
   <v-row>
     <v-col cols="12">
      <v-banner v-if="actual"> 📂 {{actual}} </v-banner>
      <span v-for="path in openFolders" :key="path"><v-btn @click="folderList(path)"> / {{ path }} </v-btn></span>
       <v-simple-table>
         <template v-slot:default>
           <thead>
             <tr>
               <th class="text-left">Arquivos</th>
             </tr>
           </thead>
            <tbody>
							<tr v-for="content in contents" :key="content.name">
								<td v-if="isDirectory(content.type)">
                  <v-icon class="icon">mdi-folder</v-icon>
                  <button
                    @click="openDirectory(content.path)"
                  >
                    {{ content.name }}
                  </button>
								</td>
								<td v-else>
                  <v-icon class="icon">mdi-file-outline</v-icon>
                  {{ content.name }}
                </td>
							</tr>
							<div v-if="typeof previousPath == 'string'">
								<v-btn class="ma-2" @click="getBack">
                  Voltar
								</v-btn>
							</div>
           </tbody>
         </template>
       </v-simple-table>
     </v-col>
   </v-row>
 </v-container>
</template>

<script>

import { api } from '~api'

export default {
	props: ['repo'],
	data: () => ({
    actual: null,
		contents: [],
		loading: false,
    openFolders: [],
    previousPath: null,
	}),
	methods: {
		async filesList(){
			this.loading = true
			const contents = await api.filesList(this.repo.owner.login, this.repo.name)
			this.contents = this.contents.concat(contents)
			this.previousPath = null
			this.loading = false
		},
		async folderList(path) {
      let gitPath = []
      this.loading = true;
      const contents = await api.folderList(
        this.repo.owner.login,
        this.repo.name,
        path
      );
      gitPath.push(this.repo.owner.login, this.repo.name, path)
      this.actual = gitPath.join('/')
      let newList = path.split("/");
      newList.pop();
      const newPath = newList.join("/");
      this.previousPath = newPath;
      this.contents = this.contents.concat(contents);
      this.loading = false;
    },
    getBack() {
      if (this.previousPath == "") {
        this.contents = [];
        this.filesList();
      } else {
        this.contents = [];
        this.folderList(this.previousPath);
      }
    },
    isDirectory(type) {
      return type == "dir";
    },
    openDirectory(path) {
      this.contents = [];
      this.folderList(path);
    },
	},
	watch: {
		repo(){
			this.contents = []
			this.filesList()
		}
	}
}

 </script>