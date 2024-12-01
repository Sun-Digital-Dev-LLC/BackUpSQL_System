import { ref } from 'vue';

export function useTime() {
    const greeting = ref('');

    const updateGreeting = () => {
        const now = new Date();
        const hours = now.getHours();

        if (hours >= 6 && hours < 12) {
            greeting.value = '早安';
        } else if (hours >= 12 && hours < 18) {
            greeting.value = '午安';
        } else {
            greeting.value = '晚安';
        }
    };

    // 只在初始化時執行一次
    updateGreeting();

    return {
        greeting
    };
}