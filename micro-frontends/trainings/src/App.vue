<template>
  <div class="page-container">
    <md-app>
      <md-app-toolbar class="md-primary">
        <span class="md-title">Landmarks</span>
      </md-app-toolbar>

      <md-app-drawer md-permanent="full">
        <md-toolbar class="md-transparent" md-elevation="0">
          Navigation
        </md-toolbar>

        <md-list>
          <md-list-item to="/create">
            <md-icon>loupe</md-icon>
            <span class="md-list-item-text">Create Landmakr</span>
          </md-list-item>

          <md-list-item to="/about">
            <md-icon>history_edu</md-icon>
            <span class="md-list-item-text">About Landmakrs</span>
          </md-list-item>

          <md-list-item @click="alert('Planned Trainings')">
            <md-icon>calendar_today</md-icon>
            <span class="md-list-item-text">Planned Landmarks</span>
          </md-list-item>

          <md-list-item @click="alert('Removed Trainings')">
            <md-icon>delete</md-icon>
            <span class="md-list-item-text">Removed Landmarks</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <md-app-content class="md-scrollbar">
        <router-view></router-view>
      </md-app-content>
    </md-app>
    <div>
      <div class="page-footer">
        <md-bottom-bar md-type="shift">
          <md-bottom-bar-item id="bottom-bar-item-home" md-label="Home" md-icon="home"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-pages" md-label="Pages" md-icon="pages"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-posts" md-label="Posts" md-icon="collections"></md-bottom-bar-item>
          <md-bottom-bar-item id="bottom-bar-item-favorites" md-label="Favorites" md-icon="favorite"></md-bottom-bar-item>
        </md-bottom-bar>
      </div>
    </div>
  </div>
</template>

<style>
:root {
  --md-theme-default-primary: #3f51b5;
}
.page-container {
  margin-top: 10px;
  min-height: 800px;
}
.page-footer {
  position: fixed;
  bottom: 0;
  width: 1200px;
  z-index: 10;
}
.md-content {
  max-height: 800px;
  overflow: auto;
}
</style>

<script>
export default {
  name: 'App',
  components: {},
  methods: {
    alert (message) {
      window.alert(message)
    }
  }
}
</script>
