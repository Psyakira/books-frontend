import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BukuView from "@/views/BukuView.vue";
import KategoriView from "@/views/KategoriView.vue";
import AnggotaView from "@/views/AnggotaView.vue";
import UpdateBuku from "@/views/UpdateBuku.vue";
import UpdateKategori from "@/views/UpdateKategori.vue";
import UpdateAnggota from "@/views/UpdateAnggota.vue";
import PeminjamView from "@/views/PeminjamView.vue";
import PilihBuku from "@/views/PilihBuku.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/buku',
    name: 'buku',
    component: BukuView
  },
  {
    path: '/kategori',
    name: 'kategori',
    component: KategoriView
  },
  {
    path: '/anggota',
    name: 'anggota',
    component: AnggotaView
  },
  {
    path: '/pinjaman',
    name: 'pinjaman',
    component: PeminjamView
  },
  {
    path: '/pilihbuku/:id',
    name: 'pilihbuku',
    component: PilihBuku
  },
  {
    path: '/updatebuku/:kode',
    name: 'updatebuku',
    component: UpdateBuku
  },
  {
    path: '/updatekategori/:kode_kategori',
    name: 'updatekategori',
    component: UpdateKategori
  },
  {
    path: '/updateanggota/:nomor',
    name: 'updateanggota',
    component: UpdateAnggota
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
