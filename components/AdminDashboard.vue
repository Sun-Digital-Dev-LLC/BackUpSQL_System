<template>
    <div class="space-y-6">
      <h1 class="text-2xl font-bold">系統概觀</h1>
      
      <!-- 狀態卡片 -->
      <div class="grid grid-cols-2 gap-6">
        <div class="p-6 bg-white rounded-lg shadow">
          <h3 class="text-lg font-medium">總節點數</h3>
          <p class="text-3xl font-bold mt-2">{{ allNode }}</p>
        </div>
        <div class="p-6 bg-white rounded-lg shadow">
          <h3 class="text-lg font-medium">運行中節點 (暫無用途)</h3>
          <p class="text-3xl font-bold mt-2">{{ allNode }}</p>
        </div>
      </div>
  
      <!-- 節點表格 -->
      <div class="bg-white rounded-lg shadow">
        <div class="p-6">
          <h3 class="text-lg font-medium mb-4">最近備份狀況</h3>
          <div class="relative">
            <table class="w-full">
                <thead>
                    <tr class="text-left bg-white">
                        <th class="w-24 pb-3">編號</th>
                        <th class="w-32 pb-3">伺服器名稱</th>
                        <th class="w-32 pb-3">異地節點 IP</th>
                        <th class="w-40 pb-3">資料庫名稱</th>
                        <th class="w-24 pb-3">延遲</th>
                        <th class="w-48 pb-3">下載用戶ID</th>
                    </tr>
                </thead>
            </table>
            <div class="max-h-64 overflow-y-auto">
                <table class="w-full">
                    <tbody>
                        <tr v-for="node in nodes" :key="node.id" class="border-b">
                            <td class="w-24 py-3">{{ node.id }}</td>
                            <td class="w-32 py-3">{{ node.name }}</td>
                            <td class="w-32 py-3">{{ node.ip }}</td>
                            <td class="w-40 py-3">{{ node.database }}</td>
                            <td class="w-24 py-3">{{ node.latency }}</td>
                            <td class="w-48 py-3">{{ node.userId }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  const allNode = ref(null);
  
  const response = await $fetch('/api/node/viewAllNode');
  allNode.value = response.length;

  // 模擬的節點數據
  const nodes = [
    {
      id: 'CG-01',
      name: 'WeeeRP',
      ip: '10.122.10.1',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-02',
      name: 'WeeeRP',
      ip: '10.122.10.2',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-03',
      name: 'WeeeRP',
      ip: '10.122.10.3',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-04',
      name: 'WeeeRP',
      ip: '10.122.10.1',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-05',
      name: 'WeeeRP',
      ip: '10.122.10.2',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-06',
      name: 'WeeeRP',
      ip: '10.122.10.3',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-07',
      name: 'WeeeRP',
      ip: '10.122.10.2',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
    {
      id: 'CG-08',
      name: 'WeeeRP',
      ip: '10.122.10.3',
      database: 'TestBackUpSQL',
      latency: '7ms',
      userId: '985158923717849119'
    },
  ]
  </script>