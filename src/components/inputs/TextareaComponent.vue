<template>
  <div class="textarea__container">
    <label
      class="textarea"
      :class="{
        'textarea--default': notEmpty || focused,
        'textarea--error': errors.length,
      }"
    >
      <span class="textarea__title">{{ title }}<span class="textarea__req" v-if="required">*</span></span>
      <!-- prettier-ignore -->
      <textarea
        class="textarea__field"
        @focus="focus"
        ref="input"
        :rows="rows"
        @blur="blur"
        @click="$emit('click')"
        @input="$emit('input', $event.target.value)"
        :autofocus="autofocus"
      >{{ value }}</textarea>
    </label>
    <ul class="textarea__errors" v-if="errors && errors.length">
      <li v-for="(e, i) in errors" :key="i">{{ e }}</li>
    </ul>
    <ul class="textarea__errors textarea__errors--messages" v-if="messages && messages.length">
      <li v-for="(m, i) in messages" :key="i">{{ m }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TextareaComponent",
  props: {
    title: {
      type: String,
      required: true,
    },
    errors: Array,
    rows: Number,
    messages: Array,
    value: [String, Number],
    required: Boolean,
    autofocus: Boolean,
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    notEmpty() {
      if (typeof this.value === "string") {
        return this.value && this.value.length;
      }
      return this.value !== null;
    },
  },
  methods: {
    focus() {
      if (!this.focused) {
        this.focused = true;
      }
      this.$emit("focus");
    },
    blur() {
      if (this.focused) {
        this.focused = false;
      }
      this.$emit("blur");
    },
  },
};
</script>

<style lang="stylus">
.textarea {
  background: var(--white);
  border: 1px solid var(--blue);
  box-sizing: border-box;
  border-radius: var(--radius);
  position: relative;
  cursor: text;
  transition: var(--transition);
  display: flex;
  margin: 0;

  &--error {
    border-color: var(--red);
  }

  &__req &__title {
    color: var(--red);
  }

  &__errors {
    font-size: 0.75rem;
    line-height: 15px;
    color: var(--red);
    display: flex;
    flex-direction: column;
    gap: 5px;

    &--messages {
      font-weight: 300;
      color: var(--black);
    }
  }

  &__container {
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    gap: 5px;
  }

  &--default &__title {
    font-size: 0.75rem;
    line-height: 15px;
    padding: 12px 14px;
  }

  &__title {
    font-size: 1rem;
    line-height: 19px;
    padding: 15px 12px;
    color: var(--gray-3);
    text-align: left;
    absolute: top left;
    user-select: none;
    transition: 0.2s;
    box-sizing: border-box;
    width: 100%;
  }

  &__action {
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    padding: 14px 14px;
    absolute: right top bottom;
    margin: auto;
    transition: 0s;
    z-index: 2;

    &:active, &:focus {
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.5);
      border-radius: var(--radius);
    }

    .icon {
      width: 24px;
      height: 24px;

      svg {
        width: 100%;
        height: 100%;
        svg(var(--black));
      }
    }
  }

  &__field {
    border-radius: var(--radius);
    border: none;
    box-sizing: border-box;
    background: none;
    width: 100%;
    height: 100%;
    padding: 29px 14px 14px;
    outline: none;
    font-family: var(--font_regular);
    font-size: 1rem;
    line-height: 19px;
    color: var(--black);
    appearance: none;
    z-index: 1;
  }
}
</style>
