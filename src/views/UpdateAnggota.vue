<!--eslint-disable-->
<template>
  <div class="upang">
  <input
      class="form-control"
      type="text"
      v-model="updateNomor"
      placeholder="Nomor Anggota"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateNama"
      placeholder="Nama"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateJenis_kelamin"
      placeholder="Jenis Kelamin"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateAlamat"
      placeholder="Alamat"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="text"
      v-model="updateNo_hp"
      placeholder="Nomor HP"
      aria-label="default input example" /><br />
  <input
      class="form-control"
      type="date"
      v-model="updateTanggal_terdaftar"
      placeholder="Tahun"
      aria-label="default input example" /><br />
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="updateAnggota()">
    Update Anggota
  </button>
  <router-link to="/anggota" class="btn btn-secondary me-5"
  >Back
  </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const anggotaByNomor = 'https://syakiraspace.my.id/bookstore/selectnomoranggota.php';
const updateAnggota = 'https://syakiraspace.my.id/bookstore/updateanggotabynomor.php';

export default {
  data(){
    return{
      selectAnggota: ref([]),
      updateNama: '',
      updateNomor: '',
      updateJenis_kelamin: '',
      updateAlamat: '',
      updateNo_hp: '',
      updateTanggal_terdaftar: '',
    }
  },
  mounted() {
    this.getAnggota();
  },
  methods: {
    getAnggota(){
      axios.get(anggotaByNomor + '?nomor=' + this.$route.params.nomor)
          .then((resp)=>{
            console.log(resp);
            this.selectAnggota = resp.data;
            this.updateNomor = this.selectAnggota.nomor;
            this.updateNama = this.selectAnggota.nama;
            this.updateJenis_kelamin = this.selectAnggota.jenis_kelamin;
            this.updateAlamat = this.selectAnggota.alamat;
            this.updateNo_hp = this.selectAnggota.no_hp;
            this.updateTanggal_terdaftar = this.selectAnggota.tanggal_terdaftar;
          })
          .catch((err) => {
            console.log(err);
          })
    },
    updateAnggota() {
      let formData = new FormData();

      formData.append('nomor', this.$route.params.nomor);
      formData.append('nama', this.updateNama);
      formData.append('jenis_kelamin', this.updateJenis_kelamin);
      formData.append('alamat', this.updateAlamat);
      formData.append('no_hp', this.updateNo_hp);
      formData.append('tanggal_terdaftar', this.updateTanggal_terdaftar);


      axios.post(updateAnggota, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.getAnggota();
          })
          .catch((err) => {
            console.log(err);
          });
    },
  },
}
</script>

<style scoped>
.upang{
  margin-top: 70px;
  margin-bottom: 25px;
}
</style>