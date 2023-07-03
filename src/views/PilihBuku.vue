<!--eslint-disable-->
<template>
  <div class="pb">
  <input
      class="form-control"
      type="text"
      v-model="updateIdPeminjaman"
      placeholder="Id Peminjaman Master"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateKodebuku"
      placeholder="Pilih Kode Buku"
      aria-label="default input example" /><br />
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="pilihBuku()">
    Pilih Buku
  </button>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const peminjamByid = 'http://syakiraspace.my.id/bookstore/selectpeminjambyid.php';
const PilihBuku = 'http://syakiraspace.my.id/bookstore/pilihbuku.php';

export default {
  data(){
    return{
      selectPeminjam: ref([]),
      updateIdPeminjaman: '',
      updateKodebuku: '',
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData(){
      axios.get(peminjamByid + '?id_peminjaman_master=' + this.$route.params.id_peminjaman_master)
          .then((resp)=>{
            console.log(resp);
            this.selectPeminjam = resp.data;
            this.updateIdPeminjaman = this.selectPeminjam.id_peminjaman_master;
            this.updateKodebuku = this.selectPeminjam.kode_buku;
          })
          .catch((err) => {
            console.log(err);
          })
    },
    pilihBuku() {
      let formData = new FormData();

      formData.append('id_peminjaman_master', this.$route.params.id_peminjaman_master);
      formData.append('kode_buku', this.updateKodebuku);


      axios.post(PilihBuku, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then((resp) => {
            console.log(resp.data);
            this.getData();
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