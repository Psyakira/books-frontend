<!--eslint-disable-->
<template>
  <div class="upbuk">
  <input
      class="form-control"
      type="text"
      v-model="updateKode"
      placeholder="Kode Buku"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateKode_kategori"
      placeholder="Kode Kategori"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateJudul"
      placeholder="Judul Buku"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updatePengarang"
      placeholder="Nama Pengarang"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updatePenerbit"
      placeholder="Nama Penerbit"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateTahun"
      placeholder="Tahun"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="date"
      v-model="updateTanggal_input"
      placeholder="Tanggal Input"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="number"
      v-model="updateHarga"
      placeholder="Harga"
      aria-label="default input example" /><br />
  <div class="mb-3">
    <input
        class="form-control"
        type="file"
        ref="file"
        id="formFile" />
    <img src="file" alt="file_cover" style="width: 120px; margin-top: 10px">
  </div>
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="updateBuku()">
    Update Buku
  </button>
  <router-link to="/buku" class="btn btn-secondary me-5"
  >Back
  </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const bukuByKode = 'http://syakiraspace.my.id/bookstore/selectkodebuku.php';
const updateBuku = 'http://syakiraspace.my.id/bookstore/updatebukubykode.php';

export default {
  data(){
    return{
      selectBuku: ref([]),
      updateKode: '',
      updateKode_kategori: '',
      updateJudul: '',
      updatePengarang: '',
      updatePenerbit: '',
      updateTahun: '',
      updateTanggal_input: '',
      updateHarga: '',
      file: '',
    };
  },
  mounted() {
    this.getBuku();
    this.updateBuku();
  },
  methods: {
    getBuku(){
      axios
          .get(bukuByKode + '?kode=' + this.$route.params.kode)
          .then((resp) => {
            console.log(resp);
            this.selectBuku = resp.data;
            this.updateKode = this.selectBuku.kode;
            this.updateKode_kategori = this.selectBuku.kode_kategori;
            this.updateJudul = this.selectBuku.judul;
            this.updatePengarang = this.selectBuku.pengarang;
            this.updatePenerbit = this.selectBuku.penerbit;
            this.updateTahun = this.selectBuku.tahun;
            this.updateTanggal_input = this.selectBuku.Tanggal_input;
            this.updateHarga = this.selectBuku.harga;
            this.file = this.selectBuku.file_cover;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    updateBuku() {
      this.file = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append('kode', this.$route.params.kode);
      formData.append('kode_kategori', this.updateKode_kategori);
      formData.append('judul', this.updateJudul);
      formData.append('pengarang', this.updatePengarang);
      formData.append('penerbit', this.updatePenerbit);
      formData.append('tahun', this.updateTahun);
      formData.append('tanggal_input', this.updateTanggal_input);
      formData.append('harga', this.updateHarga);
      formData.append('file_cover', this.file);

      axios.post(updateBuku, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
          .then((resp) => {
            console.log(resp.data);
            this.getBuku();
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
}
</script>

<style scoped>
.upbuk{
  margin-top: 70px;
  margin-bottom: 25px;
}
</style>