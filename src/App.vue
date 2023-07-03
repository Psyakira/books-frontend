<template>
  <div id="navbar">
    <nav class="navbar navbar-expand-lg fixed-top bg-body-tertiary">
      <div class="container">
        <p style="font-family: 'Edwardian Script ITC'; font-size: 30px; padding-bottom: 0;" >Syakira's Book</p>
        <div id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/">Home</router-link> |
            </li>
            <li class="nav-item">
              <router-link to="/buku">Buku</router-link> |
            </li>
            <li class="nav-item">
              <router-link to="/kategori">Kategori</router-link> |
            </li>
            <li class="nav-item">
              <router-link to="/anggota">Anggota</router-link> |
            </li>
            <li class="nav-item">
              <router-link to="/pinjaman">Peminjaman</router-link> |
            </li>
            <li class="nav-item">
              <router-link to="/about">About</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <router-view/>
  <p class="fixed-bottom"> Copyright by Syakira</p>
</template>

<style>
#app {
  font-family: Cambria, Montserrat, Cambria, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #0E1D35;
  align-content: center;
  background-color: #f1f1fa;
}

#navbar {
  padding: 30px;
  text-align: center;
  padding-bottom: 0;
  margin-bottom: 0;
  background-color: #2B3D5B;
}

nav a {
  font-weight: bold;
  color: #7C8594;
}

nav a.router-link-exact-active {
  color: #15253F;
  alignment: center;
}

.fixed-bottom{
  color: #2B3D5B;
  padding: initial;
  text-align: center;
}
tr{
  text-align: center;
}
.container{
  padding : 0px;
}

</style>
