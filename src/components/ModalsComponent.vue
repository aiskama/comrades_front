<template>
  <transition-group class="modal" name="bounce" tag="div" v-show="$store.state._modals.length">
    <div class="modal__content" v-for="(modal, index) in modals" :key="`key-${index}`">
      <div class="modal__background" @click="close(index)" ref="background"></div>
      <div class="modal__body" ref="modal">
        <component
          :is="modal.component"
          @close="close(index)"
          :options="Object.assign(modal.options || {}, { key: index })"
        ></component>
      </div>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: "ModalsComponent",
  methods: {
    close(i) {
      return this.$store.state._modals.splice(i, 1);
    },
  },
  computed: {
    modals() {
      return this.$store.state._modals;
    },
  },
  updated() {
    // Чтобы скролл не прятался за фиксированным фоном
    setTimeout(() => {
      if (this.$refs.modal) {
        this.$refs.modal.forEach((m, i) => {
          const bounds = m.getBoundingClientRect();
          this.$refs.background[i].style = `width:${bounds.width}px`;
        });
      }
    }, 250);
  },
  watch: {
    // Чтобы страница не скроллилась когда открыта модалка
    "$store.state._modals.length"(val) {
      if (val > 0) {
        document.body.classList.add("no-overflow");
      } else {
        document.body.classList.remove("no-overflow");
      }
    },
    // Чтобы модалки закрывались при изменении роута/переходе на страницу
    "$route.params"() {
      this.$store.state._modals = [];
    },
  },
};
</script>

<style lang="stylus">
@keyframes bounce-in {
  0% {
    transform: scale(0.98);
  }
  50% {
    transform: scale(1.02);
  }
  100% {
    transform: scale(1);
  }
}

.bounce-enter-active {
  animation: bounce-in var(--transition) cubic-bezier(0.175, 0.885, 0.320, 1.275);
}

.bounce-enter {
  animation: bounce-in var(--transition) reverse cubic-bezier(0.175, 0.885, 0.320, 1.275);
}

.no-overflow {
  overflow hidden
}

.modal {
  fixed left top
  width 100%
  height 100%
  z-index 999
  overflow hidden
  background: rgba(0, 0, 0, 0.2);

  &__content {
    width 100%
    height 100%
    position relative
    display none
    align-items flex-start
    justify-content center
    overflow-y auto

    &:last-child {
      display flex
    }
  }

  &__background {
    fixed left top
    height 100%
    z-index 0
    cursor pointer
  }

  &__body {
    display flex
    justify-content: center;
    width 100%
    margin: 80px 0;
    +below(590px) {
      margin 0
    }
  }
}

.modal-body {
  background: var(--white);
  border-radius: var(--radius)
  padding 26px 30px
  display flex
  flex-direction column
  align-items stretch
  justify-content stretch
  color var(--black)
  justify-self center
  align-self center
  max-width: 450px;
  width 100%
  z-index 15
  gap 20px
  box-shadow: 0 16px 24px rgba(0, 0, 0, 0.2), 0px 2px 6px rgba(0, 0, 0, 0.2), 0px 0px 1px rgba(0, 0, 0, 0.2);
  +below(590px) {
    max-width: initial;
    padding 16px
    border-radius 0
  }

  &__header {
    display flex
    flex-direction column
    position relative

    .btn {
      padding: 8px;
      height: 30px;
      max-width: 30px;
      right: 0;
      position: absolute;
    }
  }

  &__title {
    display flex
    align-items: center;
    justify-content: space-between;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 22px;
    color: var(--blue);
    letter-spacing: 0.2px;
    margin-top 15px
    margin-bottom 10px

    +below(590px) {
      font-size 0.875rem
    }
  }

  &__subtitle {
    font-weight: normal;
    font-size: 1rem;
    line-height: 17px;
    letter-spacing: 0.002rem
    color: var(--gray-4);
    +below(590px) {
      font-size 0.75rem
    }

    a {
      text-decoration underline var(--blue)
      color var(--blue)
    }
  }

  &__text {
    font-weight: normal;
    font-size: 0.8rem;
    line-height: 17px;
    color: var(--gray-4);
    letter-spacing: 0.2px;
    margin 0

    a {
      text-decoration underline var(--blue)
      color var(--blue)
    }
  }

  &__close {
    absolute right top
    background none
    padding 0
    border none
    cursor pointer
    display flex

    .icon {
      width 22px
      height 22px

      svg {
        width 100%
        height 100%
      }
    }
  }

  &__form {
    display flex
    flex-direction column
    gap 12px

    .textarea__container,
    .input__container,
    .btn {
      width 100%
    }
  }
}
</style>
