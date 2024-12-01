<template>
    <div class="flex min-h-screen pt-10">
      <div class="container mx-auto px-4 py-8">
        <!-- 用戶資料卡片 -->
        <div class="bg-white shadow-lg rounded-lg p-6">
          <h2 class="text-2xl font-bold mb-6">用戶資料</h2>
          <div v-if="pending">載入中...</div>
          <div v-else-if="sessionData?.user" class="space-y-4">
            <div class="flex items-center space-x-4">
              <img
                v-if="sessionData.user.image"
                :src="sessionData.user.image"
                alt="User avatar"
                class="w-16 h-16 rounded-full"
              />
              <div>
                <p class="text-xl font-medium">{{ sessionData.user.name }}</p>
                <p class="text-gray-600">{{ sessionData.user.email }}</p>
              </div>
            </div>
            
            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-700">Discord ID</h3>
                <p class="text-gray-600">{{ sessionData.user.id }}</p>
              </div>
              <div class="bg-gray-50 p-4 rounded-lg">
                <h3 class="font-medium text-gray-700">登入時間</h3>
                <p class="text-gray-600">{{ loginTime }}</p>
              </div>
            </div>
          </div>
          <div v-else class="text-center py-4">
            <p class="text-gray-600">未登入，正在重定向...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const { status, data: session } = useAuth()
  const router = useRouter()
  
  // 路由守衛
  definePageMeta({
    middleware: 'auth'
  })
  
  // 使用 ref 來存儲會話數據
  const sessionData = ref(null)
  const pending = ref(true)
  const loginTime = ref(new Date().toLocaleString())
  
  // 使用 watchEffect 來監控 session
  watchEffect(() => {
    if (status.value === 'authenticated' && session.value) {
      sessionData.value = session.value
      pending.value = false
    } else if (status.value === 'unauthenticated') {
      router.push('/')
    }
  })
  
  // 確保組件掛載時檢查認證狀態
  onMounted(() => {
    if (status.value === 'unauthenticated') {
      router.push('/')
    }
  })
  </script>