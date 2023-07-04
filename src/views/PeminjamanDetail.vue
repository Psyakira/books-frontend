<!--eslint-disable-->
<template>
  <div class="ktg">
    <thead>
    <tr>
      <th scope="col">No</th>
      <th scope="col">Id peminjaman</th>
      <th scope="col">Kode Buku</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(data, idx) in detail">
      <td>{{ idx + 1 }}</td>
      <td>{{data.id_peminjaman}}</td>
      <td>{{data.kode_buku}}</td>
    </tr>
    </tbody>
  </div>

</template>

<script>
import axios from 'axios';
import { ref } from 'vue';

const dataDetail='http://syakiraspace.my.id/bookstore/peminjamandetail.php';

export default {
  data(){
    return{
      detail: ref([]),
    }
  },
  mounted(){
    this.readDetail();
  },
  methods: {
    readDetail() {
      axios.get(dataDetail).then((resp) => {
        console.log(resp);
        this.detail = resp.data
      })
          .catch((err) => {
            console.log(err);
          });
    },
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