<template>
    <p>{{ progress }}%</p>
    <div class="loading-bar-container d-flex ga-2 align-center">
        <div
        class="loading-bar"
        :style="{
            width: progress + '%',
            backgroundColor: color,
            height: height
        }"
        ></div>
    </div>
</template>

<script>
export default {
  name: 'LinearLoading',
  props: {
    progress: {
      type: String,
      default: '0' // value between 0–100
    },
    color: {
      type: String,
      default: '#42b983' // Vue green by default
    },
    height: {
      type: String,
      default: '4px'
    }
  }
}
</script>

<style scoped>
.loading-bar-container {
  width: 100%;
  background-color: #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
}

.loading-bar {
  transition: width 0.3s ease;
}
</style>
