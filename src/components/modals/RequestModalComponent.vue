<template>
  <div class="modal-body">
    <div class="modal-body__header">
      <h1 class="modal-body__title">Оставить заявку</h1>
      <span class="modal-body__subtitle">
        Укажите свои данные и мы свяжемся с Вами в ближайшее время. Так же можете написать лично нам на почту
        -
        <a :href="`mailto:${$store.state.email}`">
          <b>{{ $store.state.email }}</b>
        </a>
      </span>
      <button v-if="!loading" type="button" class="btn btn--white" @click="$emit('close')">
        <CloseIcon />
      </button>
    </div>
    <form class="modal-body__form" @submit="submit">
      <InputComponent
        :errors="form.email.errors"
        v-model.trim="form.email.value"
        type="email"
        title="E-mail"
        :required="form.email.required"
        autofocus
      />
      <InputComponent
        mask="+7 (###) ###-##-##"
        :errors="form.phone.errors"
        v-model.trim="form.phone.value"
        :required="form.phone.required"
        title="Телефон*"
      />
      <InputComponent
        :errors="form.comment.errors"
        v-model.trim="form.comment.value"
        :required="form.comment.required"
        title="Название компании"
      />
      <!--      <div class="modal-body__text" v-if="false">-->
      <!--        <span>Отправляя заявку, я принимаю </span>-->
      <!--        <a href="#" target="_blank">Политику конфиденциальности</a>-->
      <!--        <span> и </span>-->
      <!--        <a href="#" target="_blank">Пользовательское соглашение</a>-->
      <!--        <span> Comrades Devs</span>-->
      <!--      </div>-->
      <div class="modal-body__text">
        <span> "*" - поле обязательно для заполнения</span><br />
        <span>Отправляя заявку, я принимаю </span>
        <a href="/static/files/policy.pdf" target="_blank">Условия обработки персональных данных</a>
        <span> Comrades Devs</span>
      </div>
      <button type="submit" class="btn btn--blue">
        <LoadingIndicator v-if="loading" title="Обработка" />
        <template v-else>Оставить заявку</template>
      </button>
    </form>
  </div>
</template>

<script>
import CloseIcon from "components/CloseIcon.vue";
import InputComponent from "components/inputs/InputComponent.vue";
import AlertModal from "components/modals/AlertModal.vue";
import CLAIM_CREATE from "@/graphql/ClaimCreate.graphql";
import LoadingIndicator from "components/LoadingIndicator.vue";

export default {
  name: "RequestModalComponent",
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      loading: false,
      form: {
        email: {
          errors: [],
          value: null,
          required: false,
        },
        phone: {
          errors: [],
          value: null,
          required: true,
          phone: true,
        },
        comment: {
          errors: [],
          value: null,
          required: false,
        },
      },
    };
  },
  methods: {
    checkForm() {
      // Очистка
      Object.keys(this.form).forEach((key) => {
        this.form[key].errors = [];
      });
      // Проверка
      Object.keys(this.form).forEach((key) => {
        // Если поля НЕ bool и file
        if (!["file", "bool"].includes(this.form[key].type)) {
          if (this.form[key].required && (this.form[key].value === null || this.form[key].value === "")) {
            this.form[key].errors.push("Поле обязательно для заполнения");
          }
        }
        if (this.form[key].phone && this.form[key].value.length < 18) {
          this.form[key].errors.push("Заполните поле корректно");
        }
        if (this.form[key].type === "bool") {
          if (this.form[key].value === null) {
            this.form[key].errors.push("Вы должны выбрать один из вариантов");
          }
        }
      });
      // Подсчет количества ошибок
      let errorsLength = 0;
      Object.keys(this.form).forEach((key) => {
        errorsLength += this.form[key].errors.length;
      });
      return errorsLength === 0;
    },
    submit(e) {
      e.preventDefault();
      if (this.checkForm()) {
        this.loading = true;
        let title = null;
        if (this.options && this.options.title) {
          title = this.options.title;
        }
        this.$apollo.provider.defaultClient
          .mutate({
            mutation: CLAIM_CREATE,
            variables: {
              email: this.form.email.value,
              phone: this.form.phone.value,
              title: title,
              comment: this.form.comment.value,
              from_url: location.href,
            },
          })
          .then(({ data }) => {
            if (data.ClaimCreate) {
              this.$emit("close");
              this.$store.state._modals.push({
                component: AlertModal,
                options: {
                  message: data.ClaimCreate.message,
                },
              });
            }
            this.loading = false;
          })
          .catch(({ graphQLErrors }) => {
            graphQLErrors.forEach((err) => {
              if (err.extensions.category === "validation") {
                Object.keys(err.extensions.validation).forEach((key) => {
                  err.extensions.validation[key].forEach((error) => {
                    if (this.form[key]) {
                      this.form[key].errors.push(error);
                    }
                  });
                });
              }
            });
          });
      }
    },
  },
  components: { LoadingIndicator, InputComponent, CloseIcon },
};
</script>
