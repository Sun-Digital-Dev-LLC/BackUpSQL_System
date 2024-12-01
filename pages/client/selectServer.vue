<template>
  <div class="flex min-h-screen">
    <div class="w-full max-w-6xl mx-auto px-4">
      <div class="pt-24">
        <h1 class="text-3xl font-bold text-center mb-12">
          {{ showFileList ? "備份檔案列表" : "請選擇備份伺服器" }}
        </h1>

        <!-- 伺服器選擇列表 -->
        <div v-if="!showFileList" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="server in servers"
            :key="server.id"
            class="p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            @click="handleServerClick(server)"
          >
            <div class="text-center">
              <h2 class="text-xl font-semibold">{{ server.name }}</h2>
            </div>
          </div>
        </div>

        <!-- SQL 文件列表 -->
        <div v-else>
          <div class="mb-4">
            <button
              @click="showFileList = false"
              class="px-2 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              返回伺服器選擇
            </button>
          </div>

          <div v-if="sqlFiles.length > 0" class="space-y-4">
            <div
              v-for="file in sqlFiles"
              :key="file.name"
              class="p-4 bg-white rounded-lg shadow hover:bg-gray-100 cursor-pointer transition-all duration-200"
              @click="downloadFile(file)"
            >
              <div class="flex justify-between items-center">
                <span>
                  {{ file.name }}
                </span>
                <span class="text-sm text-gray-500">{{ file.size }}</span>
              </div>
            </div>
          </div>
          <div v-else class="text-center text-gray-500">
            此資料夾中沒有找到 SQL 檔案
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { saveAs } from "file-saver";
const { data: session } = useAuth();

const sessionData = ref(null);
const currentServer = ref(null);
const showFileList = ref(false);
const sqlFiles = ref([]);
const servers = ref([]);

sessionData.value = session.value;

onMounted(async () => {
  try {
    console.log(sessionData.value.user.id);
    const response = await $fetch("/api/client/selectServer", {
      method: "POST",
      body: {
        id: sessionData.value.user.id,
      },
    });

    if (response.success) {
      servers.value = response.data;
    } else {
      console.error("Failed to fetch servers:", response.message);
    }
  } catch (error) {
    console.error("Error fetching servers:", error);
  }
});

const handleServerClick = async (server) => {
  try {
    const response = await $fetch("/api/download/viewSqlFile", {
      method: "POST",
      body: server,
    });

    if (response.success) {
      sqlFiles.value = response.data;
      currentServer.value = server;
      console.log(currentServer.value);
      showFileList.value = true;
    } else {
      alert(response.message);
    }
  } catch (error) {
    console.error("Error fetching SQL files:", error);
    alert("獲取檔案列表失敗");
  }
};

const downloadFile = async (file) => {
  try {
    file.isDownloading = true;

    const response = await $fetch("/api/download/downloadFile", {
      method: "POST",
      body: {
        server: currentServer.value,
        fileName: file.name,
      },
      responseType: "blob",
    });

    saveAs(response, file.name);
  } catch (error) {
    console.error("Error downloading file:", error);
    alert("下載失敗，請稍後再試");
  } finally {
    file.isDownloading = false;
  }
};
</script>
