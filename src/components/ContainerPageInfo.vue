<template>
  <div class="containt-santa">
    <img src="/img/img-santa.png" alt="Santa Claus" class="img-santa" />
    <h1>Buzón de cartas para Papá Noel</h1>
    <p>Registrate y escribí tu carta</p>
  </div>
</template>

<script>
export default {
  name: "ContainerPageInfo",
};
</script>

<style>
.containt-santa {
    text-align: center;
    border-radius: 10px;
    height: 415px;
}
.img-santa {
    width: 420px;
}
h1 {
    font-size: 28px;
    width: 324px;
    color: #ffffff;
    font-weight: 500;
    line-height: 34px;
    margin: -145px auto 0px;
}
p {
  font-size: 16px;
  color: #fff;
}
</style>