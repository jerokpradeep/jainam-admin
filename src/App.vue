<script setup lang="ts"></script>

<template>
  <div>
    <notifications
      id="toaster_text"
      group="auth"
      position="top right"
      :classes="'my-notification'"
      :duration="4000"
      :speed="500"
      :ignoreDuplicates="false"
      :reverse="true"
      :closeOnClick="true"
    />
    <div class="h-[100vh] bg-[#f7f5f5]">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  mounted() {
    var clientId = localStorage.getItem("clientId");
    var sessionId = localStorage.getItem("sessionId");
    if (!!clientId && !!sessionId) {
      this.$store.commit("setUserId", clientId);
      this.$store.commit("setSessionId", sessionId);
    }
  },
})
</script>


<style>
@import url("https://fonts.googleapis.com/css2?family=Inter&display=swap");
.card {
  @apply w-full bg-[#ffffff];
}
</style>

<style>
.my-notification {
  margin: 12px 12px 8px 0px;
  padding: 8px;
  color: #44a4fc;
  height: 40px;
  background-color: #44a4fc;
  border-left: 5px solid #187fe7;
  border-radius: 2px;
}
.notification-content {
  @apply leading-5;
}
.notification-title {
  @apply mb-1 !text-sm;
}

.my-notification.success {
  color: #4caf50 !important;
  background-color: #f5fff5 !important;
  border-left: 5px solid #4caf50 !important;
  @apply font-semibold !text-xs;
}

.my-notification.error {
  background-color: #fff7f7;
  color: #e34242;
  border-left: 5px solid #e34242;
  @apply font-semibold !text-xs;
}

.my-notification.warn {
  background-color: #fffbf3;
  border-left: 5px solid #ff9900;
  color: #ff9900;
  @apply font-semibold !text-xs;
}

/*  */

.highlightHover:hover .changeColorHover {
  fill: #ffffff !important;
  transition: all ease 0.3s;
}

.changeColorHover {
  fill: #753ed7;
  transition: all ease 0.3s;
}

/* close option in taoster */
.my-notification .close-button {
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  /* Add your custom close icon */
  /* Example: using Font Awesome close icon */
  /* Make sure to include the corresponding CSS for the icon library */
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  content: "\f00d"; /* Close icon unicode */
  font-size: 14px;
}

.my-notification .close-button:hover {
  color: red; /* Change the color on hover if desired */
}
.z-index-full {
  z-index: 99 !important;
}

</style>
