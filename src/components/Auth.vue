<template>
  <div class="popup-overlay" v-if="show">
    <div class="popup">
      <h2>{{ isLogin ? "Iniciar sesión" : "Registrarse" }}</h2>
      <form @submit.prevent="handleSubmit">
        <input type="email" v-model="email" placeholder="Correo electrónico" required />
        <input type="password" v-model="password" placeholder="Contraseña" required />
        <button type="submit">
          {{ isLogin ? "Iniciar sesión" : "Registrarse" }}
        </button>
        <button type="button" @click="closePopup">Cerrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  props: {
    show: Boolean,
    isLogin: Boolean,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async handleSubmit() {
      const auth = getAuth();
      try {
        if (this.isLogin) {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
          console.log("Usuario autenticado:", userCredential.user);
        } else {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          console.log("Usuario registrado:", userCredential.user);
        }
        this.closePopup();
      } catch (error) {
        console.error("Error:", error.message);
        alert(error.message);
      }
    },
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.popup {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
  max-width: 500px;
  width: 100%;
  box-sizing: border-box;
}

.popup{
  color: #333;
}

form input {
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
}
button {
  margin-top: 10px;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
