export default defineNuxtRouteMiddleware(async (to, from) => {
    const { status } = useAuth()
    
    // 等待認證狀態
    if (status.value === 'loading') {
      return
    }
    
    // 未認證時重定向到首頁
    if (status.value === 'unauthenticated') {
      return navigateTo('/', { redirectCode: 401 })
    }
  })