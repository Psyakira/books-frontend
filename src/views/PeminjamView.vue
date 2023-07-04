<!--eslint-disable-->
<template>
  <div class="pjm">
    <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Tanggal Peminjaman</th>
      <th scope="col">Nomor_anggota</th>
      <th scope="col">Status Peminjaman</th>
      <th scope="col">Tanggal Pengembalian</th>
      <th scope="col">Durasi Keterlambatan</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="data in pinjaman">
      <td>{{data.id_peminjaman}}</td>
      <td>{{data.tanggal_peminjaman}}</td>
      <td>{{data.nomor_anggota}}</td>
      <td>{{data.status_peminjaman}}</td>
      <td>{{data.tanggal_pengembalian}}</td>
      <td>{{data.durasi_keterlambatan}}</td>
      <td>
        <router-link
            :to="{ name: 'pilihbuku', params: {id_peminjaman: data.id_peminjaman } }"
            class="btn btn-warning me-3"
        >Pilih Buku</router-link>
        <button
            type="button"
            class="btn btn-danger"
            v-on:click="DeletePeminjam(data.id_peminjaman)">
          Delete
        </button>
      </td>
    </tr>
    </tbody>
    <h3>Tambahkan Pinjaman </h3>
    <p>Ingin meminjam buku? silahkan lakukan input pada kolom dibawah ini</p>
    <div class="modal-body">
      <input
          class="form-control"
          type="text"
          v-model="insertTanggal_peminjaman"
          placeholder="Tanggal Peminjaman"
          aria-label="default input example" /><br />
      <input
          class="form-control"
          type="text"
          v-model="insertNomor_anggota"
          placeholder="Nomor Angggota"
          aria-label="default input example" /><br />
      <input
          class="form-control"
          type="text"
          v-model="insertStatus_peminjaman"
          placeholder="Status Pinjaman : isi 1 jika ingin meminjam, isi 0 jika ingin mengembalikan buku"
          aria-label="default input example" /><br />
      <input
          class="form-control"
          type="text"
          v-model="insertTanggal_pengembalian"
          placeholder="Tanggal Pengembalian"
          aria-label="default input example" /><br />
      <input
          class="form-control"
          type="text"
          v-model="insertDurasi_keterlambatan"
          placeholder="Durasi keterlambatan"
          aria-label="default input example" /><br />
    </div>
    <button
        type="button"
        class="btn btn-primary"
        v-on:click="postPinjaman()">
      Tambah Pinjaman
    </button>
  </div>

</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const dataPinjaman='https://syakiraspace.my.id/bookstore/selectallpeminjam.php';
const insertPinjaman='https://syakiraspace.my.id/bookstore/peminjamanbuku.php';
const deletePinjaman='https://syakiraspace.my.id/bookstore/deletepeminjaman.php';

export default {
  data(){
    return{
      pinjaman: ref([]),
      insertNomor_anggota: '',
      insertTanggal_peminjaman: '',
      insertStatus_peminjaman: '',
      insertDurasi_keterlambatan: '',
      insertTanggal_pengembalian: '',
    }
  },
  mounted(){
    this.readPinjaman();
  },
  methods: {
    readPinjaman(){
      axios.get(dataPinjaman).then((resp) => {
        console.log(resp);
        this.pinjaman=resp.data
      })
          .catch((err)=>{
            console.log(err);
          });
    },
    postPinjaman() {
      let formData = new FormData();

      formData.append('tanggal_peminjaman', this.insertTanggal_peminjaman);
      formData.append('nomor_anggota', this.insertNomor_anggota);
      formData.append('status_peminjaman', this.insertStatus_peminjaman);
      formData.append('tanggal_pengembalian', this.insertTanggal_pengembalian);
      formData.append('durasi_keterlambatan', this.insertDurasi_keterlambatan);

      axios
          .post(insertPinjaman, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.readPinjaman();
            this.insertTanggal_peminjaman = '';
            this.insertNomor_anggota = '';
            this.insertStatus_peminjaman = '';
            this.insertTanggal_pengembalian = '';
            this.insertDurasi_keterlambatan = '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    DeletePeminjam(id_peminjaman) {
      if (confirm('Apakah anda ingin mendelete data ?')) {
        axios
            .get(deletePinjaman + '?id_peminjaman=' + id_peminjaman)
            .then((resp) => {
              console.log(resp);
              this.readPinjaman();
            })
            .catch((err) => {
              console.log(err);
            });
      }
    }
  }
}
</script>

<style scoped>
h3,p{
  margin-top: 20px;
  margin-bottom: 15px;
  text-align: center;
}
.pjm{
  margin-top: 45px;
  padding-bottom: 50px;
}
</style>