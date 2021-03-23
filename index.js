export default {
  name: 'GmSkeleton',
  abstract: true,
  props: {
    skeletPrefix: {
      type: String,
      default: 'gm-skeleton',
      required: false
    },
    showSpin: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  render(h) {
    const slots = this.$slots.default || [h('')]
    this.$nextTick().then(() => {
      this.handlerPrefix(slots, this.showSpin ? this.addSkeletPrefix : this.removeSkeletPrefix)
    })

    return slots.length > 1 ? h('div', {
      staticClass: this.showSpin ? 'g-spinner' : ''
    }, slots) : slots
  },
  methods: {
    handlerPrefix(slots, handler, init = true) {
      slots.forEach(slot => {
        var children = slot.children || (slot.componentOptions || {}).children || ((slot.componentInstance || {})._vnode || {}).children
        if (slot.data) {
          if (!slot.componentOptions) {
            !init && handler(slot)
          } else if (!this.$hoc_utils.getAbstractComponent(slot)) {
            ;(function(slot) {
              const handlerComponent = this.handlerComponent.bind(this, slot, handler, init)
              const insert = (slot.data.hook || {}).insert
              ;(slot.data.hook || {}).insert = () => { // 函数重构, 修改原有的组件hook, 并且保证insert只执行一次
                insert(slot)
                handlerComponent()
              }
              ;(slot.data.hook || {}).postpatch = handlerComponent
            }).call(this, slot)
          }
        }
        if (slot && slot.elm && slot.elm.nodeType === 3) {
          if (this.showSpin) {
            slot.memorizedtextContent = slot.elm.textContent
            slot.elm.textContent = ''
          } else {
            slot.elm.textContent = slot.memorizedtextContent || slot.elm.textContent || slot.text
          }
        }
        children && this.handlerPrefix(children, handler, false)
      })
    },
    handlerComponent(slot, handler, init) {
      const originchildren = (((slot.componentInstance || {})._vnode || {}).componentOptions || {}).children
      const compchildren = ((slot.componentInstance || {})._vnode || {}).children
      !init && handler(slot)
      if (compchildren) this.handlerPrefix(compchildren, handler, false)
      if (originchildren) this.handlerPrefix(originchildren, handler, false)
    },
    addSkeletPrefix(slot) {
      const rootVnode = slot.componentOptions ? (slot.componentInstance || {})._vnode || {} : slot;
      if (rootVnode.elm) {
        rootVnode.elm.classList.add(this.skeletPrefix)
      } else {
        ;(rootVnode.data || {}).staticClass += ` ${this.skeletPrefix}`
      }
    },
    removeSkeletPrefix(slot) {
      const rootVnode = slot.componentOptions ? (slot.componentInstance || {})._vnode || {} : slot;
      if (rootVnode.elm) {
        rootVnode.elm.classList && rootVnode.elm.classList.remove(this.skeletPrefix)
      } else if (rootVnode.data.staticClass) {
        rootVnode.data.staticClass = rootVnode.data.staticClass.replace(` ${this.skeletPrefix}`, '')
      }
    }
  }
}
