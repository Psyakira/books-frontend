<!--eslint-disable-->
<template>
  <div class="upkat">
  <input
      class="form-control"
      type="text"
      v-model="updateKode_kategori"
      placeholder="Kode Kategori"
      aria-label="default input example"/><br>
  <input
      class="form-control"
      type="text"
      v-model="updateJenis_kategori"
      placeholder="Jenis Kategori"
      aria-label="default input example"/><br>
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="updateKategori()">
    Update Kategori
  </button>
  <router-link to="/kategori" class="btn btn-secondary me-5"
  >Back
  </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const kategoriBykode = 'http://syakiraspace.my.id/bookstore/selectkodekategori.php';
const updateKategori = 'http://syakiraspace.my.id/bookstore/updatekategoribykode.php';

export default {
  data(){
    return{
      selectKategori: ref([]),
      updateKode_kategori: '',
      updateJenis_kategori: ''
    }
  },
  mounted() {
    this.getKategori();
    this.updateKategori();
  },
  methods: {
    getKategori(){
      axios
          .get(kategoriBykode + '?kode_kategori=' + this.$route.params.kode_kategori)
          .then((resp) => {
            console.log(resp);
            this.selectKategori = resp.data;
            this.updateKode_kategori = this.selectKategori.kode_kategori;
            this.updateJenis_kategori = this.selectKategori.jenis_kategori;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    updateKategori(){
      let formData = new FormData();

      formData.append('kode_kategori', this.$route.params.kode_kategori);
      formData.append('jenis_kategori', this.updateJenis_kategori);

      axios.post(updateKategori, formData, {
        headers:{
          'Content-Type': 'multipart/form-data',
        },
      })
          .then((resp) => {
            console.log(resp.data);
            this.getKategori();
          })
          .catch((err) => {
            console.log(err);
          });
    }
  }
}
</script>

<style scoped>
.upkat{
  margin-top: 70px;
  margin-bottom: 25px;
}
</style>