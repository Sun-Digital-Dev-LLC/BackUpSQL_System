import { ref, reactive } from 'vue'

export function useNodeDB() {
    const formData = reactive({
        nodeIp: '',
        dbPort: '',
        dbUsername: '',
        dbPassword: '',
        backupDbName: '',
        discordId: '',
        serverName: ''
    })

    const rules = reactive({
        nodeIp: {
            required: true,
            message: '請輸入Node IP',
            trigger: 'blur'
        },
        dbPort: {
            required: true,
            message: '請輸入資料庫連接埠',
            trigger: 'blur'
        },
        dbUsername: {
            required: true,
            message: '請輸入資料庫使用者名稱',
            trigger: 'blur'
        },
        dbPassword: {
            required: true,
            message: '請輸入資料庫密碼',
            trigger: 'blur'
        },
        backupDbName: {
            required: true,
            message: '請輸入備份資料庫名稱',
            trigger: 'blur'
        },
        discordId: {
            required: true,
            message: '請輸入Discord ID',
            trigger: 'blur'
        },
        serverName: {
            required: true,
            message: '請輸入伺服器名稱',
            trigger: 'blur'
        }
    })

    const errors = reactive({
        nodeIp: '',
        dbPort: '',
        dbUsername: '',
        dbPassword: '',
        backupDbName: '',
        discordId: '',
        serverName: ''
    })

    const validateForm = () => {
        let isValid = true;

        if (!formData.nodeIp) {
            errors.nodeIp = rules.nodeIp.message;
            isValid = false;
        }
        if (!formData.dbPort) {
            errors.dbPort = rules.dbPort.message;
            isValid = false;
        }
        if (!formData.dbUsername) {
            errors.dbUsername = rules.dbUsername.message;
            isValid = false;
        }
        if (!formData.dbPassword) {
            errors.dbPassword = rules.dbPassword.message;
            isValid = false;
        }
        if (!formData.backupDbName) {
            errors.backupDbName = rules.backupDbName.message;
            isValid = false;
        }
        if (!formData.discordId) {
            errors.discordId = rules.discordId.message;
            isValid = false;
        }
        if (!formData.serverName) {
            errors.serverName = rules.serverName.message;
            isValid = false;
        }

        return isValid;
    }

    const resetForm = () => {
        Object.keys(formData).forEach(key => {
          formData[key as keyof typeof formData] = ''
        })
        Object.keys(errors).forEach(key => {
          errors[key as keyof typeof errors] = ''
        })
    }

    const submitForm = () => {
        if (validateForm()) {
            try {
                console.log('Form submitted', formData);
                resetForm();
            } catch (error) {
                console.error('Form submission error', error);
            }
        }
    }

    return {
        formData,
        rules,
        errors,
        validateForm
    }
}