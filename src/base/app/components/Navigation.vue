<script setup lang="ts">
import type { RouteRecordNormalized } from 'vue-router'

interface RouteMeta {
  navigationOrder?: number
  navigationParent?: string
  title?: string
}

type RouteWithMeta = RouteRecordNormalized & { meta: RouteMeta }

const open = ref(false)
const scrollPosition = ref<number>(0)

const router = useRouter()

const navigation = computed(() => {
  const routes = router.getRoutes() as RouteWithMeta[]

  return routes
    .filter(entry => entry.meta.navigationOrder && !entry.meta.navigationParent)
    .map((entry) => {
      entry.children = routes.filter(
        child =>
          child.meta.navigationParent === entry.meta.navigationOrder
          && child.meta.navigationOrder,
      )
      return entry
    })
    .sort((a, b) => ((a.meta?.navigationOrder ?? 0) as number) - ((b.meta?.navigationOrder ?? 0) as number))
})

const getSubnavigation = (parent: RouteWithMeta) => {
  return parent?.children
    ?.filter(entry => (entry.meta as RouteMeta).navigationOrder)
    ?.sort((a, b) => ((a.meta?.navigationOrder ?? 0) as number) - ((b.meta?.navigationOrder ?? 0) as number))
    || []
}

const toggleNavigation = () => {
  if (open.value) {
    closeNavigation()
  }
  else {
    openNavigation()
  }
}

const openNavigation = () => {
  open.value = true
  scrollPosition.value = document.documentElement.scrollTop || document.body.scrollTop

  document.documentElement.scrollTop = 0
  document.body.scrollTop = 0
  document.body.style.top = `-${scrollPosition.value}px`
  document.body.classList.add('scrolling--disabled')
}

const closeNavigation = () => {
  open.value = false

  document.documentElement.classList.add('smooth-scroll--disabled')
  document.body.classList.remove('scrolling--disabled')
  document.documentElement.scrollTop = scrollPosition.value
  document.body.scrollTop = scrollPosition.value
  document.body.style.top = ''
  document.documentElement.classList.remove('smooth-scroll--disabled')
}

const handleKeypress = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeNavigation()
  }
}

const handleRouteChange = () => {
  closeNavigation()
}

onMounted(() => {
  document.addEventListener('keydown', handleKeypress)
  router.beforeEach((to, from, next) => {
    // Don't close navigation for anchor-only changes
    if (from.path === to.path && from.hash !== to.hash) {
      next()
    }
    else {
      handleRouteChange()
      next()
    }
  })
})

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeypress)
})
</script>

<template>
  <nav
    class="navigation"
    :class="{ 'navigation--open': open }"
  >
    <button
      type="button"
      class="navigation__toggle"
      @click="toggleNavigation"
    >
      <Icon name="icon:menu" />
      <span class="visually-hidden">Menu</span>
    </button>
    <div
      class="backdrop navigation__backdrop"
      :class="{ 'backdrop--active': open }"
      @click="closeNavigation"
    />
    <div class="navigation__panel">
      <ul class="navigation__list">
        <li
          v-for="entry in navigation"
          :key="entry.path"
          class="navigation__item"
        >
          <NuxtLink
            class="navigation__link"
            :to="entry.path"
          >
            {{ entry.meta.title }}
          </NuxtLink>
          <ul
            v-if="getSubnavigation(entry)?.length"
            class="navigation-sub__list"
          >
            <li
              v-for="child in getSubnavigation(entry)"
              :key="child.path"
              class="navigation-sub__item"
            >
              <NuxtLink
                class="navigation-sub__link"
                :to="child.path"
              >
                {{ (child.meta as RouteMeta)?.title }}
              </NuxtLink>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style>
@import url('~layers/components/Navigation.css');
</style>
