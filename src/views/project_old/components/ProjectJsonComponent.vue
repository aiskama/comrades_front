<template>
  <div class="project_json">
    <EditorJSArticleComponent :text="JSON.parse(data)" />
  </div>
</template>

<script>
import EditorJSArticleComponent from "components/EditorJSArticleComponent.vue";

export default {
  name: "ProjectJsonComponent",

  components: { EditorJSArticleComponent },
  props: {
    data: String,
  },
};
</script>

<style lang="stylus">
.project_json {
  display: flex;
  flex-direction: column;
  padding: 60px 300px;

  +below(1400px) {
    padding: 30px 0 60px 80px;
  }

  +below(1100px) {
    padding: 30px 15px 60px 15px;
  }

  img {
    //max-height: 600px !important
    border-radius: 10px;
  }

  p {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue-o5);
    display: grid;
    grid-template-columns: auto;
    column-gap: 70px;
    row-gap: 15px;

    +below(1400px) {
      font-size: 1.375rem;
    }

    +below(1100px) {
      font-size: 1rem;
    }

    li {
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 28px;
      color: var(--blue-o5);
      display: grid;
      grid-template-columns: auto;
      column-gap: 70px;
      row-gap: 15px;

      +below(1400px) {
        font-size: 1.375rem;
      }

      +below(1100px) {
        font-size: 1rem;
      }
    }

    b {
      font-weight: 500;
      font-size: 1.3rem;
      line-height: 35px;
      padding: 30px 0;
      color: var(--blue);

      +below(1100px) {
        font-size: 1.1rem;
      }
    }

    i {
      color: var(--blue);
      font-style: normal;
    }
  }

  li {
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 28px;
    color: var(--blue-o5);

    +below(1400px) {
      font-size: 1.375rem;
    }

    +below(1100px) {
      font-size: 1rem;
    }
  }
}
</style>
