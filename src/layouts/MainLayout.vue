<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-grey-10">
      <q-toolbar class="constrain">
        <q-btn
          flat
          round
          dense
          size="md"
          icon="photo_camera"
          to="/camera"
          class="large-screen-only q-mr-sm"
        />
        <q-separator vertical spaced class="large-screen-only" />

        <q-toolbar-title class="text-pacifico text-bold q-py-sm">
          Quasagram
        </q-toolbar-title>
        <q-btn
          flat
          round
          dense
          size="md"
          icon="home"
          to="/"
          class="large-screen-only"
        />
      </q-toolbar>
    </q-header>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-10"
      >
        <q-route-tab to="/" icon="home" />
        <q-route-tab to="/camera" icon="photo_camera" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  components: {},
  data() {
    return {
      leftDrawerOpen: false,
    };
  },
};
</script>

<style lang="scss">
.q-toolbar__title {
  font-size: 30px;
  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}

.q-footer {
  .q-tab__icon {
    font-size: 30px;
  }
}
</style>