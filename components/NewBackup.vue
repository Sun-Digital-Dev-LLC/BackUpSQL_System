<template>
    <div class="w-full max-w-lg mx-auto">
      <h1 class="text-2xl font-bold text-center mb-6">新增異地節點</h1>
      
      <form @submit.prevent="handleSubmit">
        <!-- 節點 IP -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">節點 IP</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ServerIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.nodeIp"
              type="text"
              placeholder="ex: 10.122.10.1"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- 節點資料庫 Port -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">節點資料庫 Port</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <CircleStackIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.dbPort"
              type="number"
              placeholder="ex: 3306"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- 資料庫使用者名稱 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">資料庫 使用者名稱</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <UserIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.dbUsername"
              type="text"
              placeholder="ex: sundigit"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- 資料庫使用者密碼 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">資料庫 使用者密碼</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <KeyIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.dbPassword"
              type="password"
              placeholder="ex: Password001"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- 備份資料庫名稱 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">備份資料庫名稱</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FolderIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.backupDbName"
              type="text"
              placeholder="ex: esxlegacy_2024"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- Discord ID -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">可下載檔案用戶 Discord ID</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <IdentificationIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.discordId"
              type="text"
              placeholder="ex: 988669032536363028"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- 伺服器名稱 -->
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700 mb-1">伺服器名稱</label>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <ComputerDesktopIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              v-model="formData.serverName"
              type="text"
              placeholder="ex: WeeeRP"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>
  
        <!-- 按鈕組 -->
        <div class="flex gap-4 justify-center mt-6">
          <button 
            type="button"
            class="inline-flex items-center px-4 py-2 bg-blue-400 hover:bg-blue-500 text-white rounded-md transition-colors disabled:opacity-50"
            @click="testConnection"
            :disabled="isLoading"
          >
            <LinkIcon class="h-5 w-5 mr-2" />
            測試連線
          </button>
            <button 
            type="submit"
            class="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md transition-colors disabled:opacity-50"
            :disabled="isLoading || !connectionStatus || !connectionStatus.success"
            >
            <PlusIcon class="h-5 w-5 mr-2" />
            確定新增
            </button>
        </div>
      </form>
      <div v-if="connectionStatus" class="mt-2">
        <p :class="connectionStatus.success ? 'text-green-600' : 'text-red-600'">
          {{ connectionStatus.message }}
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { 
    ServerIcon,
    CircleStackIcon,
    UserIcon,
    KeyIcon,
    FolderIcon,
    IdentificationIcon,
    ComputerDesktopIcon,
    LinkIcon,
    PlusIcon
  } from '@heroicons/vue/24/outline'
  import { useNodeDB } from '~/composables/useNodeDB';

  const isLoading = ref(false)
  const connectionStatus = ref(null);
  const { formData, validateForm } = useNodeDB()
  
  async function testConnection() {
    isLoading.value = true
    validateForm(formData)
    try {
      console.log(formData)
      const response = await $fetch('/api/node/testConnection', {
        method: 'POST',
        body: formData
      });

      if (response.success === false) {
        connectionStatus.value = response
        isLoading.value = false
        return;
      } else {
        connectionStatus.value = response
      }
      console.log(response)
      isLoading.value = false

    } catch (err) {
      connectionStatus.value = {
        success: false,
        message: '發生錯誤：' + err.message
      };
    }
  }
  
  const handleSubmit = async () => {
    isLoading.value = true
    try {
      const response = await $fetch('/api/node/addNode', {
        method: 'POST',
        body: formData
      });

      if (response.success) {
      alert('新增成功！');
      // 清空表單
      Object.keys(formData).forEach(key => formData[key] = '');
      } else {
      alert('新增失敗：' + response.message);
      }
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('新增失敗：' + error.message);
    } finally {
      isLoading.value = false;
    }
  }
  </script>