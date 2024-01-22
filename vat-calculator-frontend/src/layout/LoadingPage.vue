<template>
  <div class="relative h-full">
    <transition
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      enter-active-class="transition-opacity"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      leave-active-class="transition-opacity"
    >
      <div
        v-if="loading"
        class="absolute inset-0 h-screen z-30 flex flex-col justify-center items-center bg-slate-100 shadow-inner"
      >
        <transition
          enter-from-class="scale-0"
          enter-to-class="scale-100"
          enter-active-class="transition-transform duration-500"
          leave-from-class="scale-100"
          leave-to-class="scale-0"
          leave-active-class="transition-transform"
          appear
        >
          <div>
            <svg
              class="z-40 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              width="150"
              height="150"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="2" r="0" fill="currentColor">
                <animate
                  attributeName="r"
                  begin="0"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(45 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.125s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(90 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.25s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(135 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.375s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(180 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.5s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(225 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.625s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(270 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.75s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
              <circle
                cx="12"
                cy="2"
                r="0"
                fill="currentColor"
                transform="rotate(315 12 12)"
              >
                <animate
                  attributeName="r"
                  begin="0.875s"
                  calcMode="spline"
                  dur="1s"
                  keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
                  repeatCount="indefinite"
                  values="0;2;0;0"
                />
              </circle>
            </svg>
          </div>
        </transition>
      </div>
    </transition>

    <div class="w-full h-full p-10 bg-slate-100">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    loading: Boolean,
  },
};
</script>
