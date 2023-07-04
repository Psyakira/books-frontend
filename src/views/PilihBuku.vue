<!--eslint-disable-->
<template>
  <div class="pb">
  <input
      class="form-control"
      type="text"
      v-model="getIdPeminjaman"
      placeholder="Id Peminjaman Master"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="insertbuku"
      placeholder="Pilih Kode Buku"
      aria-label="default input example" /><br />
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="pilihBuku()">
    Pilih Buku
  </button>
    <router-link to="/detail" class="btn btn-secondary me-5"
    >Lihat Detail Peminjaman
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const peminjamByid = 'https://syakiraspace.my.id/bookstore/selectpeminjambyid.php';
const PilihBuku = 'https://syakiraspace.my.id/bookstore/pilihbuku.php';

export default {
  data(){
    return{
      selectPeminjam: ref([]),
      getIdPeminjaman: '',
      insertbuku: '',
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios.get(peminjamByid + '?id_peminjaman=' + this.$route.params.id_peminjaman)
          .then((resp)=>{
            console.log(resp);
            this.selectPeminjam = resp.data;
            this.getIdPeminjaman = this.selectPeminjam.id_peminjaman;
          })
          .catch((err) => {
            console.log(err);
          })
    },
    pilihBuku() {
      let formData = new FormData();

      formData.append('id_peminjaman', this.$route.params.id_peminjaman);
      formData.append('kode_buku', this.insertbuku);

      axios.post(PilihBuku, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then((resp) => {
            console.log(resp.data);
            this.readDetail();
            this.getIdPeminjaman = '';
            this.insertbuku = '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
}
</script>

<style scoped>
.pb{
  margin-top: 65px;
}
</style>