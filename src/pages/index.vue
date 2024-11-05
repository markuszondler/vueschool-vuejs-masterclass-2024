<script setup lang="ts">
</script>

<template>
  <div>
    <h1>Home Page</h1>
    <RouterLink :to="{ name: '/projects/' }">Projects</RouterLink>
    <RouterLink :to="{ name: '/tasks/' }">Tasks</RouterLink>
  </div>
</template>
