<template>
  <div id="app">
    <header class="header">
      <nav class="header__nav">
        <RouterLink to="/">
          Home
        </RouterLink>
        <RouterLink to="/HelloWorld">
          HelloWorld
        </RouterLink>
        <RouterLink to="/G6Editor">
          G6Editor
        </RouterLink>
      </nav>
    </header>
    <RouterView />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
