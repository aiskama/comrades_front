<template>
  <div class="modal-body">
    <div class="modal-body__header">
      <span class="modal-body__title">Оповещение</span>
      <span class="modal-body__subtitle">Ваша заявка отправлена</span>
      <button type="button" class="btn btn--white" @click="$emit('close')">
        <CloseIcon />
      </button>
    </div>
  </div>
</template>

<script>
import CloseIcon from "components/CloseIcon.vue";

export default {
  name: "AlertModal",
  props: {
    options: {
      type: Object,
    },
  },
  methods: {
    close() {
      this.$emit("close");
      this.options.callback();
    },
  },
  components: { CloseIcon },
};
</script>
