export default {
  methods: {
    displayRipple (event) {
      // invalid if it's called from an embedded page in iframe
      if (!window || window !== window.top) return;

      // remove old ripple element
      const oldRippleElement = document.getElementById('ripple');
      if (oldRippleElement) {
        oldRippleElement.parentNode.removeChild(oldRippleElement);
      }

      // calc ripple position
      const rippleRadius = 15;
      const posX = event.clientX - rippleRadius;
      const posY = event.clientY - rippleRadius;

      // create new ripple element
      const newRippleElement = document.createElement('span');
      newRippleElement.id = 'ripple';
      newRippleElement.style.width = (rippleRadius * 2) + 'px';
      newRippleElement.style.height = (rippleRadius * 2) + 'px';
      newRippleElement.style.left = posX + 'px';
      newRippleElement.style.top = posY + 'px';
      newRippleElement.style.backgroundColor = this.rippleColor || 'rgba(10, 60, 91, 0.8)';

      this.$root.$el.appendChild(newRippleElement);
      newRippleElement.classList.add('ripple-effect');
    },
  },
};
