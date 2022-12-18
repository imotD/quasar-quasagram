<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-bold">jm-tommy</q-item-label>
              <q-item-label caption> {{ post.location }} </q-item-label>
            </q-item-section>
          </q-item>

          <q-separator />

          <img class="card-post__img" :src="post.imageUrl" />

          <q-card-section>
            <div>{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ post.date | niceDate }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">jm-tommy</q-item-label>
            <q-item-label caption> Tommy Alhamra</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
import { date } from "quasar";

export default {
  name: "PageHome",
  data() {
    return {
      posts: [
        {
          id: 1,
          caption: "Swiss Mountain",
          date: 1671343003981,
          location: "Tanah Abang, Indonesia",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 2,
          caption: "Swiss Mountain",
          date: 1671343003981,
          location: "Tanah Abang, Indonesia",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
        {
          id: 3,
          caption: "Swiss Mountain",
          date: 1671343003981,
          location: "Tanah Abang, Indonesia",
          imageUrl: "https://cdn.quasar.dev/img/mountains.jpg",
        },
      ],
    };
  },
  filters: {
    niceDate: function (value) {
      return date.formatDate(value, "dddd, D MMMM YY, H:mm:ss A");
    },
  },
};
</script>

<style lang="scss" scoped>
.card-post {
  &__img {
    min-height: 200px;
  }
}
</style>
