<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-8">
        <template v-if="!loadingPost && posts.length">
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
              <div class="text-caption text-grey">
                {{ post.date | niceDate }}
              </div>
            </q-card-section>
          </q-card>
        </template>

        <template v-else-if="!loadingPost && !posts.length">
          <h5 class="text-center text-grey">No Posts yet.</h5>
        </template>

        <template v-else>
          <q-card>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square />

            <q-item>
              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card>
        </template>
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
      posts: [],
      loadingPost: false,
    };
  },
  methods: {
    getPosts() {
      this.loadingPost = true;

      this.$axios
        .get("http://localhost:3000/posts")
        .then((res) => {
          this.posts = res.data;
          this.loadingPost = false;
        })
        .catch((e) => {
          this.loadingPost = false;
          this.$q.dialog({
            title: "Error",
            message: e,
          });
        });
    },
  },
  filters: {
    niceDate: function (value) {
      return date.formatDate(value, "dddd, D MMMM YY, H:mm:ss A");
    },
  },

  created() {
    this.getPosts();
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
