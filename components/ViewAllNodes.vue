<template>
  <div class="w-full h-full">
    <Loading 
      v-model:active="isLoading"
      :is-full-page="false"
      :can-cancel="false"
      :color="'#000000'"
      :loader="'dots'"
      :background-color="'#ffffff'"
    />
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">查看所有異地節點</h2>
      <button
        @click="fetchNodeData"
        class="flex items-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50"
      >
        <ArrowDownTrayIcon class="w-4 h-4" />
        更新資料
      </button>
    </div>

    <div class="relative">
      <table class="w-full">
        <thead>
          <tr class="border-b bg-white">
            <th class="text-left p-3 w-24">編號</th>
            <th class="text-left p-3 w-32">伺服器名稱</th>
            <th class="text-left p-3 w-32">異地節點 IP</th>
            <th class="text-left p-3 w-48">異地節點 資料庫名稱</th>
            <th class="text-left p-3 w-24">連線延遲</th>
            <th class="text-left p-3 w-44">下載用戶ID</th>
            <th class="text-left p-3 w-20">備註</th>
          </tr>
        </thead>
      </table>

      <div class="overflow-y-auto max-h-[505px]">
        <table class="w-full">
          <tbody>
            <tr
              v-for="node in nodes"
              :key="node.id"
              class="border-b hover:bg-gray-50"
            >
              <td class="p-3 w-24">{{ node.id }}</td>
              <td class="p-3 w-32">{{ node.server_name }}</td>
              <td class="p-3 w-32">{{ node.node_ip }}</td>
              <td class="p-3 w-48">{{ node.backup_db_name }}</td>
              <td class="p-3 w-24">{{ node.latency }}</td>
              <td class="p-3 w-44">{{ node.discord_id }}</td>
              <td class="p-3 w-20">
                <button
                  @click="openEditModal(node)" 
                  class="text-gray-600 hover:text-black"
                >
                  <EllipsisHorizontalCircleIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-if="isRemark" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-6 rounded-md shadow-md w-1/3">
          <h3 class="text-lg font-bold mb-4">修改節點參數</h3>
          <form @submit.prevent="submitForm">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">伺服器名稱</label>
              <input v-model="editForm.server_name" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">異地節點 IP</label>
              <input v-model="editForm.node_ip" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">異地節點 資料庫名稱</label>
              <input v-model="editForm.backup_db_name" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700">下載用戶ID</label>
              <input v-model="editForm.discord_id" type="text" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
            </div>
            <div class="flex justify-center font-semibold">
              <button type="button" @click="deleteNode" class="mr-4 px-4 py-2 bg-red-500 rounded-md">刪除節點</button>
              <button type="button" @click="closeEditModal" class="mr-4 px-4 py-2 bg-gray-300 rounded-md">取消</button>
              <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md">提交</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownTrayIcon, EllipsisHorizontalCircleIcon } from "@heroicons/vue/20/solid";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css'

const isLoading = ref(false);
const isRemark = ref(false);
const originalNode = ref(null)
const nodes = ref([]);
const editForm = ref({
  id: null,
  server_name: '',
  node_ip: '',
  backup_db_name: '',
  discord_id: ''
})

const fetchNodeData = async () => {
  try {
    isLoading.value = true
    const response = await $fetch('/api/node/viewAllNode');

    if (!response) {
      throw new Error('Network response was not ok')
    };

    nodes.value = response.map(node => ({
      id: node.id,
      server_name: node.server_name,
      node_ip: node.node_ip, 
      backup_db_name: node.backup_db_name,
      latency: '7ms',
      discord_id: node.discord_id,
    }))

    console.log('Node data:', nodes)
  } catch (error) {
    console.error('Error fetching node data:', error)
  } finally {
    isLoading.value = false
  }
}

const openEditModal = (node) => {
  originalNode.value = { ...node }
  editForm.value = { ...node }
  isRemark.value = true
}

const closeEditModal = () => {
  isRemark.value = false
  editForm.value = {
    id: null,
    server_name: '',
    node_ip: '',
    backup_db_name: '',
    discord_id: ''
  }
}

const submitForm = async () => {
  try {
    isLoading.value = true
    const changedFields = {}
    
    // 比较每個字串，包含修改過的
    Object.keys(editForm.value).forEach(key => {
      if (editForm.value[key] !== originalNode.value[key]) {
        changedFields[key] = editForm.value[key]
      }
    })
    
    // 如果有修改的字段，则发送请求
    if (Object.keys(changedFields).length > 0) {
      changedFields.id = editForm.value.id
      
      const response = await $fetch('/api/node/editNode', {
        method: 'POST',
        body: changedFields
      })
      
      if (response.success) {
        await fetchNodeData()
        closeEditModal()
      }
    } else {
      closeEditModal()
    }
  } catch (error) {
    console.error('Error updating node:', error)
  } finally {
    isLoading.value = false
  }
}

const deleteNode = async () => {
  try {
    isLoading.value = true
    
    const response = await $fetch('/api/node/deleteNode', {
      method: 'POST',
      body: { id: editForm.value.id }
    })
    
    if (response.success) {
      await fetchNodeData()
      closeEditModal()
    }
  } catch (error) {
    console.error('Error deleting node:', error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchNodeData()
})
</script>

<style scoped>
table {
  table-layout: fixed;
}
</style>