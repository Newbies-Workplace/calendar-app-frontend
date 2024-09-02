<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
  timestamp: ""
})

const count = ref(0)
const count2 = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <!--<button type="button" @click="count++">count is {{ count }}</button> -->
    <!--<button type="button" @click="count2++">count2 is {{ count2 }}</button> -->
    <div class="form=group">
        <label for="name">Nazwa eventu </label>
        <input type="text" class="form-control" id="name" placeholder="wpisz nazwę"/>
        <br>
        <label for="guests">Liczba osób </label>
        <input type="number" id="guests" name="guests" min="0" max="100" placeholder="0"/>
        <br>
        <label for="start">Start date: </label>
        <input type="date" id="start" name="trip-start" value="datetime" min="datetime"/>
        <br>
        <label for="end">End date:</label>
        <input type="date" id="end" name="trip-end" value="datetime" min="datetime" />
    </div>
    <br>
    <button type="button" @click="">Submit (tbd)</button>
  </div>

  
  
</template>
