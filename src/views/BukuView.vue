<!--eslint-disable-->
<template>
  <div class="book">
  <thead>
  <tr>
    <th scope="col">No</th>
    <th scope="col">Cover</th>
    <th scope="col">Kode Buku</th>
    <th scope="col">Kategori</th>
    <th scope="col">Judul Buku</th>
    <th scope="col">Tahun</th>
    <th scope="col">Pengarang</th>
    <th scope="col">Penerbit</th>
    <th scope="col">Harga</th>
  </tr>
  </thead>
  <tbody>
  <tr v-for="(data,idx) in buku">
    <td>{{idx +1}}.</td>
    <td><img :src="data.file_cover" alt="cover" style="width: 150px"/></td>
    <td>{{data.kode}}</td>
    <td>{{data.kode_kategori}}</td>
    <td>{{data.judul}}</td>
    <td>{{data.tahun}}</td>
    <td>by : {{data.pengarang}}</td>
    <td>{{data.penerbit}}</td>
    <td>Rp.{{data.harga}}</td>
    <td class="klik">
      <router-link
          :to="{ name: 'updatebuku', params: { kode: data.kode } }"
          class="btn btn-warning me-3"
      >Update</router-link>
      <button
          type="button"
          class="btn btn-danger"
          v-on:click="DeleteBuku(data.kode)">
        Delete
      </button>
    </td>
  </tr>
  </tbody>
  <h3>Tambahkan Koleksi Buku </h3>
  <p>Ada koleksi buku terbaru? silahkan lakukan input pada kolom dibawah ini</p>
  <div class="modal-body">
    <input
        class="form-control"
        type="text"
        v-model="insertKode"
        placeholder="Kode Buku"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertKode_kategori"
        placeholder="Kode Kategori"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertJudul"
        placeholder="Judul Buku"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertPengarang"
        placeholder="Nama Pengarang"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertPenerbit"
        placeholder="Nama Penerbit"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="text"
        v-model="insertTahun"
        placeholder="Tahun"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="date"
        v-model="insertTanggal_input"
        placeholder="Tanggal Input"
        aria-label="default input example" /><br />
    <input
        class="form-control"
        type="number"
        v-model="insertHarga"
        placeholder="Harga"
        aria-label="default input example" /><br />

    <div class="mb-3">
      <input
          class="form-control"
          type="file"
          ref="file"
          id="formFile" />
    </div>
  </div>
  <button
      type ="button"
      class="btn btn-primary"
      style="alignment: right"
      v-on:click="InsertBuku()">
    Tambah Buku
  </button>
  </div>
</template>

<script>
import axios from "axios";
import {ref} from "vue";

const dataKoleksi='http://syakiraspace.my.id/bookstore/selectallbuku.php';
const insertData='http://syakiraspace.my.id/bookstore/insertbook.php';
const deleteBuku='http://syakiraspace.my.id/bookstore/deletebukubykode.php';

export default {
  data(){
    return{
      buku:ref([]),
      insertKode: '',
      insertKode_kategori: '',
      insertJudul: '',
      insertPengarang: '',
      insertPenerbit: '',
      insertTahun: '',
      insertTanggal_input: '',
      insertHarga: '',
      file: '',
    }
  },
  mounted() {
    this.DataBuku();
    this.InsertBuku();
  },
  methods: {
    DataBuku(){
      axios.get(dataKoleksi).then((resp) => {
        console.log(resp);
        this.buku=resp.data
      })
          .catch((err)=>{
            console.log(err);
          });
    },
    InsertBuku(){
      this.file = this.$refs.file.files[0];
      let formData = new FormData();

      formData.append('kode', this.insertKode);
      formData.append('kode_kategori', this.insertKode_kategori);
      formData.append('judul', this.insertJudul);
      formData.append('pengarang', this.insertPengarang);
      formData.append('penerbit', this.insertPenerbit);
      formData.append('tahun', this.insertTahun);
      formData.append('tanggal_input', this.insertTanggal_input);
      formData.append('harga', this.insertHarga);
      formData.append('file_cover', this.file);

      axios
          .post(insertData, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((resp) => {
            console.log(resp.data);
            this.DataBuku();
            this.insertKode = '';
            this.insertKode_kategori = '';
            this.insertJudul = '';
            this.insertPengarang = '';
            this.insertPenerbit = '';
            this.insertTahun = '';
            this.insertTanggal_input = '';
            this.insertHarga = '';
            this.$refs.file.value = '';
          })
          .catch((err) => {
            console.log(err);
          });
    },
    DeleteBuku(kode) {
      if (confirm('Apakah anda ingin mendelete data ?')) {
        axios
            .get(deleteBuku + '?kode=' + kode)
            .then((resp) => {
              console.log(resp);
              this.DataBuku();
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
button{
  align-content: end;
  alignment: right;
  text-align: right;
  align-items: end;
  align-self: flex-end;
}
.book{
  margin-top: 45px;
  margin-bottom: 25px;
}
.klik{
  display: flex;
  justify-content: space-between;
  align-content: center;
  padding-top: 52%;
}
</style>