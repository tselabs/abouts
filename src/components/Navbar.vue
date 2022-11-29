<template>
  <div class="nav" draggable="false">
    <router-link to="http://likf.eu.org/">Blog</router-link>
    <router-link to="http://p.likf.eu.org/">Projects</router-link>
    <router-link to="/">Links</router-link>
    <router-link to="http://a.likf.eu.org">About</router-link>
  </div>
</template>

<style scoped>
.nav {
  font-family: MiSans;
  font-weight: 300;
  font-display: block;
  opacity: 0;
  animation: ease-in-opacity 0.75s ease 0.75s forwards;
  @apply z-50 m-0 px-0 py-2 w-full flex absolute left-0 top-0 flex-row
    justify-center align-middle items-center text-center
    select-none text-1rem transition-opacity delay-75;
}

@keyframes ease-in-opacity {
  0% {
    opacity: 0;
  }

  50% {
    opacity: 0.5;
  }

  100% {
    opacity: 1;
  }
}

.nav > a {
  text-decoration: none;
  font-display: block;
  @apply text-white opacity-75 transition-opacity rounded-sm p-5
    inline-block hover:opacity-100;
}
</style>
