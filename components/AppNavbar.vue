<template>
  <nav class="fixed top-0 right-0 py-2 px-4">
    <div class="flex space-x-4 font-semibold">
      <button v-if="isAuthenticated" @click="handleDashboardClick"
        class="px-4 py-2 text-black rounded-md">
        Dashboard
      </button>
      <button @click="handleServerClick" class="px-4 py-2 text-black rounded-md">
        Server
      </button>
      <button v-if="!isAuthenticated" @click="navigateToLogin"
        class="px-4 py-2 text-black rounded-md">
        Login
      </button>
      <button v-else @click="handleLogout" class="px-4 py-2 text-black rounded-md">
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup>
const {signOut, status } = useAuth()
const router = useRouter()

// 計算屬性：判斷是否已認證
const isAuthenticated = computed(() => status.value === 'authenticated')

const navigateToLogin = () => {
  router.push('/login')
}

const handleDashboardClick = () => {
  router.push('/client/dashboard')
}

const handleServerClick = () => {
  console.log("Server clicked")
}

const handleLogout = async () => {
  try {
    await signOut({ 
      callbackUrl: '/',
      redirect: true,
      clearCookie: true 
    })
  } catch (error) {
    console.error('Logout failed:', error)
  }
}
</script>