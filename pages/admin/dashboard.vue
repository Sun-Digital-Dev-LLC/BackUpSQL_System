<template>
    <div class="min-h-screen flex">
        <!-- 左側選單 -->
        <div class="w-66 pt-28 pl-16">
            <h1 class="text-3xl font-bold mb-8">{{ sessionData.user.name }}, {{ greeting }}</h1>
            
            <nav class="font-semibold text-black space-y-2">
                <button @click="switchComponent('AdminDashboard')"
                    class="flex items-center w-full rounded-lg px-0.5 py-2 hover:bg-gray-300">
                    <HomeIcon class="w-5 h-5 mr-2" />
                    Dashboard
                </button>

                <button @click="switchComponent('NewBackup')"
                    class="flex items-center w-full rounded-lg px-0.5 py-2 hover:bg-gray-300">
                    <PlusCircleIcon class="w-5 h-5 mr-2" />
                    新增異地節點
                </button>

                <button @click="switchComponent('ViewAllNodes')"
                    class="flex items-center w-full rounded-lg px-0.5 py-2 hover:bg-gray-300">
                    <ListBulletIcon class="w-5 h-5 mr-2" />
                    查看所有異地節點
                </button>

                <button @click="currentComponent = 'MoveBackup'"
                    class="flex items-center w-full rounded-lg px-0.5 py-2 hover:bg-gray-300">
                    <ArrowsRightLeftIcon class="w-5 h-5 mr-2" />
                    移除異地節點
                </button>
            </nav>
        </div>

        <!-- 右側內容區 -->
        <div class="flex-1 pt-[200px] pl-10 pr-16">
            <div class="bg-white rounded-lg shadow-lg p-6 min-h-[650px]">
                <component :is="components[currentComponent]" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
    HomeIcon,
    PlusCircleIcon,
    ListBulletIcon,
    ArrowsRightLeftIcon
} from '@heroicons/vue/24/outline'

import { useTime } from '~/composables/useTime';
import AdminDashboard from '~/components/AdminDashboard.vue';
import NewBackup from '~/components/NewBackup.vue';
import ViewAllNodes from '~/components/ViewAllNodes.vue';

const { data: session } = useAuth();
const { greeting } = useTime();
const currentComponent = ref('AdminDashboard');
const sessionData = ref(null);

sessionData.value = session.value

const components = {
    AdminDashboard,
    NewBackup,
    ViewAllNodes
}

const switchComponent = (component) => {
    currentComponent.value = (component)
    console.log(currentComponent.value)
}
</script>