<!--eslint-disable-->
<template>
  <div class="ktg">
  <thead>
  <tr>
    <th scope="col">No</th>
    <th scope="col">Kode Kategori</th>
    <th scope="col">Jenis Kategori</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(data, idx) in kategori">
    <td>{{ idx + 1 }}</td>
    <td>{{data.kode_kategori}}</td>
    <td>{{data.jenis_kategori}}</td>
    <td>
      <router-link
          :to="{ name: 'updatekategori', params: {kode_kategori: data.kode_kategori } }"
          class="btn btn-warning me-3"
      >Update</router-link>
      <button
          type="button"
          class="btn btn-danger"
          v-on:click="DeleteKategori(data.kode_kategori)">
        Delete
      </button>
    </td>
  </tr>
  </tbody>
  <h3>Tambahkan Kategori lainnya </h3>
  <p>Ingin menambahkan kategori lain? silahkan lakukan input pada kolom dibawah ini</p>
  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="insertKode_kategori"
        placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertJenis_kategori"
        placeholder="Jenis Kategori"
        aria-label="default input example" /><br />
  </div>
  <button
      type="button"
      class="btn btn-primary"
      v-on:click="postKategori()">
    Tambah Kategori
  </button>
  </div>

</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const dataKategori='http://syakiraspace.my.id/bookstore/selectallkategori.php';
const insertKategori='http://syakiraspace.my.id/bookstore/insertkategori.php';
const deleteKategori='http://syakiraspace.my.id/bookstore/deletekategoribykode.php';

export default {
  data(){
    return{
      kategori: ref([]),
      insertKode_kategori: '',
      insertJenis_kategori: '',
    }
  },
  mounted(){
    this.readKategori();
  },
  methods: {
    readKategori(){
      axios.get(dataKategori).then((resp) => {
        console.log(resp);
        this.kategori=resp.data
      })
          .catch((err)=>{
            console.log(err);
          });
    },
    postKategori() {
      let formData = new FormData();

      formData.append('kode_kategori', this.insertKode_kategori);
      formData.append('jenis_kategori', this.insertJenis_kategori);

      axios
          .post(insertKategori, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.readKategori();
            this.insertKode_kategori = '';
            this.insertJenis_kategori = '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    DeleteKategori(kode_kategori) {
      if (confirm('Apakah anda ingin mendelete data ?')) {
        axios
            .get(deleteKategori + '?kode_kategori=' + kode_kategori)
            .then((resp) => {
              console.log(resp);
              this.readKategori();
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
.ktg{
  margin-top: 45px;
  margin-bottom: 25px;
}
</style>