<template>
  <div class="editor-js" v-if="text && typeof text === 'object'">
    <template v-for="(block, index) in text.blocks">
      <p :key="index" v-if="block.type === 'paragraph'" v-html="block.data.text"></p>
      <h1 :key="index" v-if="block.type === 'header' && block.data.level === 1">
        {{ block.data.text }}
      </h1>
      <h2 :key="index" v-if="block.type === 'header' && block.data.level === 2">
        {{ block.data.text }}
      </h2>
      <h3 :key="index" v-if="block.type === 'header' && block.data.level === 3">
        {{ block.data.text }}
      </h3>
      <h4 :key="index" v-if="block.type === 'header' && block.data.level === 4">
        {{ block.data.text }}
      </h4>
      <h5 :key="index" v-if="block.type === 'header' && block.data.level === 5">
        {{ block.data.text }}
      </h5>
      <h6 :key="index" v-if="block.type === 'header' && block.data.level === 6">
        {{ block.data.text }}
      </h6>
      <pre :key="index" v-if="block.type === 'code'">{{ block.data.code }}</pre>
      <div :key="index" v-if="block.type === 'quote'" class="article__quote">
        <p>{{ block.data.text }}</p>
        <span>{{ block.data.caption }}</span>
      </div>
      <hr :key="index" v-if="block.type === 'delimiter'" />
      <div :key="index" v-if="block.type === 'raw'" v-html="block.data.html"></div>
      <div :key="index" v-if="block.type === 'warning'" class="article__warning">
        <span>{{ block.data.title }}</span>
        <p>{{ block.data.message }}</p>
      </div>
      <table :key="index" v-if="block.type === 'table'" class="editor-js__table">
        <tbody>
          <tr v-for="(row, i) in block.data.content" :key="i">
            <td v-for="(column, j) in row" :key="j" v-html="column"></td>
          </tr>
        </tbody>
      </table>
      <ul :key="index" v-if="block.type === 'list' && block.data.style === 'unordered'">
        <li v-for="(item, i) in block.data.items" :key="i" v-html="item"></li>
      </ul>
      <ol :key="index" v-if="block.type === 'list' && block.data.style === 'ordered'">
        <li v-for="(item, i) in block.data.items" :key="i" v-html="item"></li>
      </ol>
      <a
        :key="index"
        v-if="block.type === 'linkTool'"
        :href="block.data.link"
        target="_blank"
        class="article__link"
        rel="nofollow"
      >
        <div>
          <span>{{ block.data.meta.title.length ? block.data.meta.title : block.data.link }}</span>
          <span v-if="block.data.meta.description.length">{{ block.data.meta.description }}</span>
        </div>
        <img
          v-if="block.data.meta.image.url.length"
          :src="block.data.meta.image.url"
          :alt="block.data.meta.title"
          loading="lazy"
        />
      </a>
      <div
        :key="index"
        v-if="block.type === 'image'"
        class="article__image"
        :class="{
          'article__image--fixed': block.data.link,
          'article__image--stretched': block.data.stretched,
          'article__image--left': block.data.left,
          'article__image--right': block.data.right,
        }"
      >
        <a class="img__container" v-if="block.data.link" :href="block.data.link" target="_blank">
          <div class="img__upper__layer"></div>
          <img
            loading="lazy"
            :src="
              block.data.file.url.indexOf('http') !== -1
                ? block.data.file.url
                : $store.state._env.MEDIA_ENDPOINT + block.data.file.url
            "
            :alt="block.data.caption"
          />
          <div class="article__image-info">
            <div class="article__image-title" v-html="block.data.caption"></div>
          </div>
        </a>

        <template v-else>
          <img
            loading="lazy"
            :src="
              block.data.file.url.indexOf('http') !== -1
                ? block.data.file.url
                : $store.state._env.MEDIA_ENDPOINT + block.data.file.url
            "
            :alt="block.data.caption"
          />
          <span v-html="block.data.caption"></span>
        </template>
      </div>
    </template>
  </div>
  <div class="editor-js" v-else v-html="text"></div>
</template>

<script>
export default {
  name: "EditorJSArticleComponent",
  props: {
    text: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
};
</script>

<style lang="stylus">
.editor-js {
  display flex
  flex-direction column
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 28px;
  color: var(--blue);

  & > * {
    margin 10px 0

    &:first-child {
      margin-top: 0;
    }
  }

  ul
  ol {
    padding-left 20px
  }

  .article__embed {
    width 100%
    margin 30px 0 k

    iframe {
      width 100%
      max-width 100%
    }
  }

  .article__quote {
    width 100%
    display flex
    flex-direction column
    border-left 5px solid var(--blue)
    padding 20px 0 16px 20px

    p {
      font-weight normal
      font-size: 1rem;
      width 100%
      text-align left
      line-height: 26px
      color var(--dark)
      margin-bottom 10px
    }

    span {
      font-size 0.875rem
      line-height: 26px
      text-align right
      color rgba(0, 0, 0, 0.5);
    }
  }

  .article__link {
    display flex
    align-items flex-start
    justify-content flex-start
    box-shadow 0 15px 20px rgba(0, 0, 0, 0.05);
    border-radius 5px
    padding 10px 15px

    img {
      height 100%
      object-fit cover
      object-position center
      border-radius 5px
    }

    > div {
      display flex
      flex-direction column

      span {
        &:first-child {
          font-size 1.125rem
          line-height: 26px
          text-align left
          color var(--blue)
        }

        &:last-child {
          font-size: 1rem;
          line-height: 26px
          text-align left
          color var(--blue)
          margin-top 10px
        }
      }
    }
  }

  .article__image {
    display flex
    flex-direction column
    margin: 10px auto;
    //max-height: 540px;

    img {
      width auto
      max-width 100%
      border-radius: 10px;
      height 100%
      object-fit contain
      background var(--gray)
      max-height: 540px;
    }

    span {
      margin-top 10px
    }
  }

  .article__image--stretched {
    width 100%
    height auto
  }

  .article__image--fixed {
    position relative
    overflow hidden
    width 100%
    max-width 490px
    height: auto
    border-radius: 10px;
    margin 10px 0

    a {
      display block
      width 100%
      height 100%

      &:hover {
        .article__image-title {
          color var(--orange)
        }

        svg {
          path {
            fill var(--orange)
          }
        }
      }

      img {
        width 100%
        height 100%
        max-width 100%
        object-fit cover
        object-position center
      }
    }

    .img__upper__layer {
      position absolute
      top 0
      left 0
      right 0
      bottom 0
      width 100%
      height 100%
      z-index 2
      background: linear-gradient(180deg, transparent 24.48%, var(--black) 71.35%)
    }

    .article__image-info {
      position absolute
      bottom 0
      left 0
      right 0
      z-index 2
      display flex
      align-items flex-end
      justify-content space-between
      padding 16px 24px

      svg {
        width 48px
        height 48px

        path {
          fill var(--white)
          transition 0.2s
        }
      }
    }

    .article__image-title {
      font-weight: 500;
      font-size: 1.375rem
      line-height: 28px;
      color var(--white)
      transition 0.2s
      margin-right: 24px;
    }
  }

  .article__warning {
    display flex
    flex-direction column
    border-left 5px solid var(--red)
    padding 20px 0 16px 20px
    width 100%

    p {
      font-weight normal
      font-size: 1rem;
      width 100%
      text-align left
      line-height: 26px
      color var(--blue)
      margin 0
    }

    span {
      font-size 1.125rem
      line-height: 26px
      text-align left
      color var(--red)
      margin-bottom 10px
    }
  }

  hr {
    margin 32px 0;
    width 100%
  }

  pre,
  p {
    width 100%
    +below(420px) {
      font-size: 0.875rem;
      line-height: 26px
    }
  }

  &__table {
    & tr {
      display flex
      width 100%
    }

    & td {
      width 100%
    }
  }
}
</style>
