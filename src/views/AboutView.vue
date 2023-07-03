<template>
  <div class="about">
    <div class="image-container">
      <img src="../assets/About.jpg" alt="Gambar Homepage" class="rounded" style="alignment: center" />
      <div class="image-caption">
        <h1 style="font-family: 'Edwardian Script ITC'">Syakira's Book</h1>
          <h2>Ada lebih banyak harta karun di dalam buku daripada semua jarahan bajak laut di Pulau Harta Karun.</h2>
          <h2> - Walt Disney</h2>
        <h3> Contact Us </h3>
        <div class="contact">
          <a href="https://www.linkedin.com/in/putrisyakirawirdiani/" class="btn btn-primary">
            <img src="https://1.bp.blogspot.com/-onvhHUdW1Us/YI52e9j4eKI/AAAAAAAAE4c/6s9wzOpIDYcAo4YmTX1Qg51OlwMFmilFACLcBGAsYHQ/s1600/Logo%2BLinkedin.png" class="logo" alt="logolinkedin">
            Linkedin</a>
          <a href="https://www.instagram.com/psyakira_w/" class="btn btn-primary">
            <img src="https://logopng.com.br/logos/instagram-40.png" class="logo" alt="logoig">
            Instagram</a>
          <a href="http://wa.me/089678878557" class="btn btn-primary">
            <img src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-icone.png" class="logo" alt="logowa">
            WhatsApp</a>
          <a href="mailto:psyakira.w@gmail.com" class="btn btn-primary">
            <img src="https://www.rightclickcomputersolutions.com/wp-content/uploads/2018/05/Gmail_logo.max-2800x2800.png" class="logo" alt="logogmail">
            E-Mail</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.image-container {
  position: center;
  display: flex;
  padding: 10px;
}

img{
  width: 100%;
  height: 500px;
  margin-bottom: 20px;
}

.image-caption {
  position: absolute;
  text-align: center;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #FFFFFF;
}
h2{
  padding-top: 25px ;
  font-family: "Bradley Hand ITC";
}
.contact{
  display: flex;
  justify-content: space-between;
  alignment: center;
}
h3{
  margin-top: 20px;
  margin-bottom: 10px;
}
.logo{
  width: 25px;
  height: 25px;
  float: left;
  padding-bottom: 0px;
}
a{
  padding-top: 3%;
  padding-bottom: 0;
}
.btn-primary{
  margin: 10px;
  background-color: #2B3D5B;
}
.about{
  margin-top: 50px;
}
</style>
