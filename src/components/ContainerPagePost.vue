<template>
  <div>
  <div class="containt-santa">
    <img src="/img/img-santa.png" alt="Santa Claus" class="img-santa" />
    <h1>Buzón de cartas para Papá Noel</h1>
  </div>
    <form @submit.prevent="submitComment">
      <input v-model="title" type="text" placeholder="Título del comentario" required />
      <textarea v-model="message" placeholder="Escribe a Papa Noél tu carta" required></textarea>
      <button type="submit">Enviar Carta</button>
    </form>
  </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";


export default {
  data() {
    return {
      title: "",
      message: "",
    };
  },
  methods: {
    async submitComment() {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        alert("Registrate o iniciá sesión para comentar");
        return;
      }

      const db = getFirestore();
      const post = {
        date: new Date(),
        user: user.email,
        message: this.message,
        title: this.title,
      };

      try {
        await addDoc(collection(db, "Posts"), post);
        alert("Comentario guardado con éxito");
        this.title = "";
        this.message = "";
      } catch (error) {
        console.error("Error al guardar el comentario:", error.message);
        alert("No se pudo guardar el comentario. Intenta nuevamente.");
      }
    },
  },
};

</script>

<style>
form {
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
}

input, textarea {
  margin-bottom: 10px;
  padding: 10px;
  font-size: 16px;
}

button {
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>