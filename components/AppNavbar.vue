<template>
  <nav class="fixed top-0 right-0 py-2 px-4">
    <div class="flex space-x-4 font-semibold">
      <button v-if="isAuthenticated && isAdmin" @click="handleAdminDashboardClick"
        class="px-4 py-2 text-black rounded-md">
        Admin Dashboard
      </button>
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
const {signOut, data: session, status } = useAuth()
const router = useRouter()

// 計算屬性：判斷是否已認證
const isAuthenticated = computed(() => status.value === 'authenticated')
const isAdmin = ref(false)
const sessionData = ref(null)

sessionData.value = session.value

const navigateToLogin = () => {
  router.push('/login')
}

const handleAdminDashboardClick = () => {
  router.push('/admin/dashboard')
}

const handleDashboardClick = () => {
  router.push('/client/dashboard')
}

const handleServerClick = () => {
  router.push('/client/selectserver')
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

const checkUserRole = async () => {
  if (sessionData.value.user.id) {
    try {
      const response = await $fetch('/api/node/checkUser', {
        method: 'POST',
        body: {
          discordId: sessionData.value.user.id
        }
      })
      
      if (response.role === 'admin') {
        isAdmin.value = true
      } else {
        isAdmin.value = false
      }
    } catch (error) {
      console.error('Error checking user role:', error)
    }
  } else {
    isAdmin.value = false
  }
}

// 當組件掛載時檢查權限
onMounted(() => {
  checkUserRole()
})
</script>