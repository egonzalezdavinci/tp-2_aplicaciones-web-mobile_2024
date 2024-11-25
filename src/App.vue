<template>
  <div>
    <header>
      <nav>
        <ul v-if="!isAuthenticated">
          <button @click="openPopup(true)">Iniciar sesión</button>
          <button @click="openPopup(false)">Registrarse</button>
        </ul>
        <ul v-else>
          <p>{{ userEmail }}</p>
          <button @click="logout">Cerrar sesión</button>
        </ul>
      </nav>
    </header>
    <Auth v-if="showPopup" :show="showPopup" :isLogin="isLogin" @close="closePopup" />
    <main>    
      <ContainerPageInfo v-if="!isAuthenticated" />
      <ContainerPagePost v-else />
      <DataContainer />
    </main>
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./components/Auth.vue";
import ContainerPageInfo from "./components/ContainerPageInfo.vue";
import ContainerPagePost from "./components/ContainerPagePost.vue";
import DataContainer from "./components/DataContainer.vue";

export default {
  methods: {
    showLogin() {
      console.log("Mostrar formulario de inicio de sesión");
    },
    showRegister() {
      console.log("Mostrar formulario de registro");
    },
    openPopup(isLogin) {
      this.isLogin = isLogin;
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    async logout() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("Sesión cerrada");
      } catch (error) {
        console.error("Error al cerrar sesión:", error.message);
      }
    },
  },
  created() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.isAuthenticated = true;
        this.userEmail = user.email;
      } else {
        this.isAuthenticated = false;
        this.userEmail = "";
      }
    });
  },
  data() {
    return {
      showPopup: false,
      isLogin: true,
      isAuthenticated: false,
    }
  },
  components: {
    DataContainer,
    ContainerPageInfo,
    ContainerPagePost,
    Auth
  },
}
</script>

<style>
header {
  color: white;
  padding: 1rem;
}
nav ul {
  display: flex;
  justify-content: flex-end;
  list-style: none;
}
nav ul li {
  margin: 0 1rem;
}
nav ul li a {
  color: white;
  text-decoration: none;
  cursor: pointer;
}
</style>
