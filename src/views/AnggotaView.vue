<!--eslint-disable-->
<template>
  <div class="agt">
  <thead>
  <tr>
    <th scope="col">No</th>
    <th scope="col">Nama Anggota</th>
    <th scope="col">Jenis Kelamin</th>
    <th scope="col">Alamat</th>
    <th scope="col">Nomor Hp</th>
    <th scope="col">Tanggal Terdaftar</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="data in anggota">
    <td>{{data.nomor}}</td>
    <td>{{data.nama}}</td>
    <td>{{data.jenis_kelamin}}</td>
    <td>{{data.alamat}}</td>
    <td>{{data.no_hp}}</td>
    <td>{{data.tanggal_terdaftar}}.</td>
    <td>
      <router-link
          :to="{ name: 'updateanggota', params: { nomor: data.nomor } }"
          class="btn btn-warning me-3"
      >Update</router-link>
      <button
          type="button"
          class="btn btn-danger"
          v-on:click="DeleteAnggota(data.nomor)">
        Delete
      </button>
    </td>
  </tr>
  </tbody>
  <h3>Tambahkan Anggota Baru</h3>
  <p>Nama anggota belum terdaftar pada list diatas? silahkan lakukan input pada kolom dibawah ini</p>
  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="insertNomor"
        placeholder="Nomor Anggota"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertNama"
        placeholder="Nama"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertJenis_kelamin"
        placeholder="Jenis Kelamin"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertAlamat"
        placeholder="Alamat"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertNo_hp"
        placeholder="Nomor HP"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="date"
        v-model="insertTanggal_terdaftar"
        placeholder="Tahun"
        aria-label="default input example" /><br />
  </div>
  <button
      type ="button"
      class="btn btn-primary"
      v-on:click="postAnggota()">
    Tambah Anggota
  </button>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const dataAnggota='https://syakiraspace.my.id/bookstore/selectallanggota.php';
const insertAnggota='https://syakiraspace.my.id/bookstore/insertanggota.php';
const deleteAnggota='https://syakiraspace.my.id/bookstore/deleteanggotabynomor.php';
export default {
  data() {
    return {
      anggota: ref([]),
      insertNomor: '',
      insertNama: '',
      insertAlamat: '',
      insertJenis_kelamin: '',
      insertNo_hp: '',
      insertTanggal_terdaftar: '',
    };
  },
  mounted() {
    this.readAnggota();
  },
  methods: {
    readAnggota() {
      axios
          .get(dataAnggota)
          .then((resp) => {
            console.log(resp);
            this.anggota = resp.data;
          })
          .catch((err) => {
            console.log(err);
          });
    },
    postAnggota() {
      let formData = new FormData();

      formData.append('nomor', this.insertNomor);
      formData.append('nama', this.insertNama);
      formData.append('jenis_kelamin', this.insertJenis_kelamin);
      formData.append('alamat', this.insertAlamat);
      formData.append('no_hp', this.insertNo_hp);
      formData.append('tanggal_terdaftar', this.insertTanggal_terdaftar);

      axios
          .post(insertAnggota, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.readAnggota();
            this.insertNomor = '';
            this.insertNama = '';
            this.insertJenis_kelamin = '';
            this.insertAlamat = '';
            this.insertNo_hp = '';
            this.insertTanggal_terdaftar = '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    DeleteAnggota(nomor) {
      if (confirm('Apakah anda ingin mendelete data ?')) {
        axios
            .get(deleteAnggota + '?nomor=' + nomor)
            .then((resp) => {
              console.log(resp);
              this.readAnggota();
            })
            .catch((err) => {
              console.log(err);
            });
      }
    }
  },
};
</script>

<style scoped>
h3,p{
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
}
.agt{
  margin-top: 45px;
  margin-bottom: 25px;
}

</style>