<template>
  <div class="w-full h-full">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">查看所有異地節點</h2>
      <button
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
              <td class="p-3 w-32">{{ node.serviceName }}</td>
              <td class="p-3 w-32">{{ node.nodeIP }}</td>
              <td class="p-3 w-48">{{ node.dataSource }}</td>
              <td class="p-3 w-24">{{ node.latency }}</td>
              <td class="p-3 w-44">{{ node.userID }}</td>
              <td class="p-3 w-20">
                <button class="text-gray-600 hover:text-black">
                  <EllipsisHorizontalCircleIcon class="w-5 h-5" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowDownTrayIcon, EllipsisHorizontalCircleIcon } from "@heroicons/vue/20/solid";
const nodes = ref([
  {
    id: "CG-01",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.1",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-02",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.2",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-03",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-04",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-05",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-06",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-07",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-08",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-09",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-10",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
  {
    id: "CG-11",
    serviceName: "WeeeRP",
    nodeIP: "10.122.10.3",
    dataSource: "TestBackUpSQL",
    latency: "7 ms",
    userID: "98515892371784919",
  },
]);
</script>

<style scoped>
table {
  table-layout: fixed;
}
</style>