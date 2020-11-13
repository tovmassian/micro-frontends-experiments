<template>
  <div class="content">
    <md-empty-state
        md-icon="devices_other"
        md-label="Create your first project"
        md-description="While training your models, you'll be able to make your AI more awesome">
      <md-button class="md-primary md-raised" @click="alert('Creating training...')">Create your training</md-button>
    </md-empty-state>
  </div>
</template>
<style>
.content {
  min-height: 700px;
}
</style>

<script>
export default {
  name: 'EmptyState',
  methods: {
    alert(message) {
      window.alert(message);
    },
  }
}
</script>
