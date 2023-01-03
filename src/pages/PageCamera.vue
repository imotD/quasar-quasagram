<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video v-show="!imageCaptured" ref="video" class="full-width" autoplay />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="240"
      />
    </div>
    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        color="grey-10"
        size="lg"
        round
        icon="photo_camera"
        @click="captureImage"
      />
      <q-file
        v-else
        v-model="imageUpload"
        @input="captureImageFallback"
        label="Choose an Image"
        accept="image/*"
        outlined
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="Caption"
          dense
        />
      </div>
      <div class="row justify-center q-ma-md">
        <q-input
          v-model="post.location"
          class="col col-sm-6"
          label="Location"
          dense
        >
          <template v-slot:append>
            <q-btn round dense flat icon="location_on" />
          </template>
        </q-input>
      </div>
      <div class="row justify-center q-mt-lg">
        <q-btn unelevated rounded color="primary" label="Post Image" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { uid } from "quasar";

export default {
  name: "PageCamera",
  data() {
    return {
      post: {
        di: uid(),
        caption: "",
        location: "",
        photo: null,
        date: Date.now(),
      },

      imageCaptured: false,
      hasCameraSupport: true,

      imageUpload: [],
    };
  },
  mounted() {
    this.initCamera();
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          this.$refs.video.srcObject = stream;
        })
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },
    captureImage() {
      let video = this.$refs.video;
      let canvas = this.$refs.canvas;

      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;

      let contex = canvas.getContext("2d");
      contex.drawImage(video, 0, 0, canvas.width, canvas.height);

      this.imageCaptured = true;
      this.post.photo = this.dataURltoBlob(canvas.toDataURL());
    },
    captureImageFallback(file) {
      this.post.photo = file;

      let canvas = this.$refs.canvas;
      let contex = canvas.getContext("2d");

      let reader = new FileReader();
      reader.onload = (event) => {
        let img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          contex.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    },
    dataURltoBlob(dataurl) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], { type: mime });
    },
  },
};
</script>

<style lang="scss" scoped>
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 10px;
}
</style>
