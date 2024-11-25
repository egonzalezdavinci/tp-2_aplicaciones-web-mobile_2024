<template>
<h2>¡Cartas recibidas!</h2>
  <section class="containerMessage">
    <div class="viewPost" v-for="item in items" :key="item.id" >
        <h3>{{ item.title }}</h3>
        <p>"{{ item.message }}"</p>
        <small>{{ item.user }}</small>
        <div>
          <button @click="viewComments(item.id)">Ver comentarios</button>
          <button v-if="isAuthenticated" @click="openCommentPopup(item.id)">Hacer comentario</button>
        </div>   
    </div>
  </section>

  <!-- Popup para comentarios -->
  <div v-if="showCommentsPopup" class="overlay">
  <div class="popup">
    <h3>Comentarios</h3>
    <ul v-if="comments.length > 0">
      <li v-for="comment in comments" :key="comment.id">
        <strong>De: {{ comment.userName }}</strong>:
        <p>{{ comment.commentUser }}</p>
      </li>
    </ul>
    <p v-else>No hay comentarios</p>
    <button @click="closeCommentsPopup">Cerrar</button>
  </div>
  </div>

  <div v-if="showMakeCommentPopup" class="overlay">
  <div class="popup">
    <div class="commentContent">
      <h3>Dejar un comentario</h3>
      <textarea v-model="newComment" placeholder="Escribe tu comentario"></textarea>
      <button @click="submitComment">Enviar</button>
      <button @click="closeCommentPopup">Cancelar</button>
    </div>
  </div>
  </div>
</template>

<script>
import { getFirestore, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import firebaseApp from "../firebaseConfig";

export default {
  data() {
    return {
      items: [],
      comments: [],
      currentPostId: null,
      showCommentsPopup: false,
      showMakeCommentPopup: false,
      newComment: "",
      isAuthenticated: false,
    };
  },
  async mounted() {
    const db = getFirestore(firebaseApp);
    const querySnapshot = await getDocs(collection(db, "Posts"));
    this.items = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  },
  methods: {
    async fetchPosts() {
      const db = getFirestore();
      const postsSnapshot = await getDocs(collection(db, "Posts"));
      this.posts = postsSnapshot.docs.map(doc => ({ 
        id: doc.id, 
        ...doc.data() }));
    },
    async viewComments(postId) {
      this.currentPostId = postId;
      const db = getFirestore();
      const commentsQuery = query(collection(db, "Comments"), where("idUser", "==", postId));
      const commentsSnapshot = await getDocs(commentsQuery);
      this.comments = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      this.showCommentsPopup = true;
    },
    closeCommentsPopup() {
      this.showCommentsPopup = false;
    },
    openCommentPopup(postId) {
      this.currentPostId = postId;
      this.showMakeCommentPopup = true;
    },
    closeCommentPopup() {
      this.showMakeCommentPopup = false;
      this.newComment = "";
    },
    async submitComment() {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Debes iniciar sesión para comentar");
        return;
      }

      if (!this.newComment.trim()) {
        alert("El comentario no puede estar vacío");
        return;
      }

      const db = getFirestore();
      const comment = {
        commentUser: this.newComment,
        idUser: this.currentPostId,
        timeStamp: new Date(),
        userName: user.email,
      };

      try {
        await addDoc(collection(db, "Comments"), comment);
        alert("Comentario guardado con éxito");
        this.closeCommentPopup();
      } catch (error) {
        console.error("Error al guardar comentario:", error.message);
        alert("No se pudo guardar el comentario. Intenta nuevamente.");
      }
    },
  },
  async created() {
    await this.fetchPosts();
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      this.isAuthenticated = !!user;
    });
  },
};
</script>

<style>
section.containerMessage {
    width: 900px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-content: space-around;
    justify-content: center;
    align-items: stretch;
    padding: 0px 0px 50px;
    margin: 0 auto;
}
h2 {
  margin-bottom: 1rem;
  font-size: 30px;
  color: #5da179
}
div.viewPost{
    background-color: #ffffff;
    max-width: 440px;
    margin: 4px;
    padding: 7px;
    border-radius: 6px;
    border: 2px solid #5da179;
}
div.viewPost h3{
    color: #4a4a49;
    font-size: 16px;
}
div.viewPost p{
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    color: #831b1c;
    margin: 7px 0px 10px;
}
div.viewPost small{
    color: #4a4a49;
}

.overlay{
  width: 100%;
    height: 100%;
    position: fixed;
    background-color: #00000070;
    top: 0;
    left: 0;
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
}

.popup .commentContent{
  max-width: 400px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.popup h3{
  color: #333;
}

.popup ul{
  list-style: none;
  padding:0;
}

.popup ul li{
  text-align: left;
  border-bottom: 1px solid #831b1c;
}

.popup ul strong, .popup ul p, .popup p{
  color: #333;
}

button {
  margin: 5px;
  padding: 10px;
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