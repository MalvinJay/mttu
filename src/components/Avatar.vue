<template>
  <div class="vue-avatar--wrapper" :style="[style, customStyle]">
    <span v-if="!this.src">{{ userInitial[0] }}</span>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    username: {
      type: String,
      required: true
    },
    initials: {
      type: String
    },
    backgroundColor: {
      type: String
    },
    color: {
      type: String
    },
    customStyle: {
      type: Object
    },
    size: {
      type: Number,
      default: 40
    },
    src: {
      type: String
    },
    rounded: {
      type: Boolean,
      default: true
    },
    lighten: {
      type: Number,
      default: 80
    }
  },

  data () {
    return {
      backgroundColors: [
        '#ffdedf', '#d1e3ff', '#fff4a8', '#673AB7',
        ]
    }
  },

  mounted () {
    // this.$emit('avatar-initials', this.username, this.userInitial)
  },

  computed: {
    background () {
      return this.backgroundColor || this.randomBackgroundColor(this.username.length, this.backgroundColors)
    },

    fontColor () {
      return this.color || this.lightenColor(this.background, this.lighten)
    },

    isImage () {
      return Boolean(this.src)
    },

    style () {
      const style = {
        color: `#cdb0a9`,
        width: `${this.size}px`,
        height: `${this.size}px`,
        borderRadius: this.rounded ? '5px' : 0,
        textAlign: 'center',
        verticalAlign: 'middle'
      }

      const imgBackgroundAndFontStyle = {
        background: `#f6f0a7 url(${this.src}) no-repeat scroll 0% 0% / 40px 40px content-box border-box`
      }

      const initialBackgroundAndFontStyle = {
        backgroundColor: this.background,
        font: '14px Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        lineHeight: `${(this.size)}px`
      }

      const backgroundAndFontStyle = (this.isImage)
        ? imgBackgroundAndFontStyle
        : initialBackgroundAndFontStyle

      Object.assign(style, backgroundAndFontStyle)

      return style
    },

    userInitial () {
      const initials = this.initials || this.initial(this.username)
      return initials
    }
  },

  methods: {
    initial (username) {
      let parts = username.split(/[ -]/)
      let initials = ''

      for (var i = 0; i < parts.length && i < 2; i++) {
        initials += parts[i].charAt(0)
      }

      if (initials.length > 3 && initials.search(/[A-Z]/) !== -1) {
        initials = initials.replace(/[a-z]+/g, '')
      }

      initials = initials.substr(0, 3).toUpperCase()

      return initials
    },

    randomBackgroundColor (seed, colors) {
      return colors[seed % (colors.length)]
    },

    lightenColor (hex, amt) {
      // From https://css-tricks.com/snippets/javascript/lighten-darken-color/
      var usePound = false

      if (hex[0] === '#') {
        hex = hex.slice(1)
        usePound = true
      }

      var num = parseInt(hex, 16)
      var r = (num >> 16) + amt

      if (r > 255) r = 255
      else if (r < 0) r = 0

      var b = ((num >> 8) & 0x00FF) + amt

      if (b > 255) b = 255
      else if (b < 0) b = 0

      var g = (num & 0x0000FF) + amt

      if (g > 255) g = 255
      else if (g < 0) g = 0

      return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16)
    }
  }
}
</script>

<style lang="scss">
 
</style>
