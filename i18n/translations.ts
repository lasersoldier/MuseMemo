export type Language = 'en' | 'zh';

export interface Translations {
    // Layout
    appName: string;
    version: string;
    mySpace: string;
    nexusLibrary: string;
    tutorial: string;
    tutorialSubtitle: string;
    profile: string;
    logout: string;

    // Auth
    welcome: string;
    loginTitle: string;
    registerTitle: string;
    email: string;
    password: string;
    fullName: string;
    loginButton: string;
    registerButton: string;
    switchToRegister: string;
    switchToLogin: string;

    // Profile
    operatorProfile: string;
    secureSession: string;
    protocolCount: string;
    storedInstructions: string;
    totalExecutions: string;
    apiInteractions: string;
    preferredCore: string;
    mostUtilizedModel: string;
    dataManagement: string;
    clearUsageCounts: string;
    resetAllUserData: string;
    terminateSession: string;
    freeTier: string;
    proTier: string;
    adminTier: string;

    // MySpace
    selectNeuralCore: string;
    newPrompt: string;
    systemsActive: string;
    recentUsage: string;
    copy: string;
    copied: string;
    link: string;
    uses: string;
    editPrompt: string;
    deletePrompt: string;
    unsubscribe: string;

    // PublicLibrary
    publicDatabase: string;
    publicDatabaseSubtitle: string;
    searchQuery: string;
    all: string;
    work: string;
    study: string;
    creative: string;
    coding: string;
    saved: string;
    acquire: string;
    view: string;
    bySystem: string;
    byUser: string;

    // Modal
    simulatedOutput: string;
    aiResponsePrediction: string;
    abort: string;
    confirmEntry: string;

    // Edit Prompt
    title: string;
    operationName: string;
    targetCore: string;
    sectorTag: string;
    instructionSet: string;
    inputSystemParameters: string;
    sampleAiResponse: string;
    inputPrewrittenResponse: string;

    // Tags
    general: string;
    design: string;
    code: string;
    react: string;
    writing: string;
    content: string;

    // Confirmation
    confirmAction: string;
    areYouSure: string;
    deletePromptTitle: string;
    deletePromptMessage: string;
    unsubscribePromptTitle: string;
    unsubscribePromptMessage: string;
    clearUsageCountsTitle: string;
    clearUsageCountsMessage: string;
    resetUserDataTitle: string;
    resetUserDataMessage: string;
    cancel: string;
    confirm: string;

    // Tutorial
    tutorialWelcomeTitle: string;
    tutorialWelcomeContent: string;
    tutorialLibraryTitle: string;
    tutorialLibraryContent: string;
    tutorialViewPromptsTitle: string;
    tutorialViewPromptsContent: string;
    tutorialPreviewTitle: string;
    tutorialPreviewContent: string;
    tutorialClosePreviewTitle: string;
    tutorialClosePreviewContent: string;
    tutorialAcquireTitle: string;
    tutorialAcquireContent: string;
    tutorialMySpaceTitle: string;
    tutorialMySpaceContent: string;
    tutorialSelectModelTitle: string;
    tutorialSelectModelContent: string;
    tutorialSelectCategoryTitle: string;
    tutorialSelectCategoryContent: string;
    tutorialCopyTitle: string;
    tutorialCopyContent: string;
    tutorialCompleteTitle: string;
    tutorialCompleteContent: string;
    next: string;
    finish: string;
}

export const translations: Record<Language, Translations> = {
    en: {
        // Layout
        appName: 'MuseMemo',
        version: 'v2.1.0 [Online]',
        mySpace: 'My Space',
        nexusLibrary: 'Nexus Library',
        tutorial: 'Tutorial',
        tutorialSubtitle: 'Learn the basics',
        profile: 'Operator',
        logout: 'Logout',

        // Auth
        welcome: 'Welcome to MuseMemo',
        loginTitle: 'Sign In',
        registerTitle: 'Create Account',
        email: 'Email',
        password: 'Password',
        fullName: 'Full Name',
        loginButton: 'Sign In',
        registerButton: 'Create Account',
        switchToRegister: 'Need an account? Register',
        switchToLogin: 'Already have an account? Sign In',

        // Profile
        operatorProfile: 'Operator Profile',
        secureSession: 'Secure Session Active',
        protocolCount: 'Protocol Count',
        storedInstructions: 'Stored Instructions',
        totalExecutions: 'Total Executions',
        apiInteractions: 'API Interactions',
        preferredCore: 'Preferred Core',
        mostUtilizedModel: 'Most Utilized Model',
        dataManagement: 'Data Management',
        clearUsageCounts: 'Clear Usage Counts',
        resetAllUserData: 'Reset All User Data',
        terminateSession: 'Terminate Session',
        freeTier: 'Free',
        proTier: 'Pro',
        adminTier: 'Admin',

        // MySpace
        selectNeuralCore: 'Select Neural Core',
        newPrompt: 'New Prompt',
        systemsActive: 'SYSTEMS ACTIVE',
        recentUsage: 'Recent Usage',
        copy: 'COPY',
        copied: 'COPIED',
        link: 'LINK',
        uses: 'Uses',
        editPrompt: 'Edit Prompt',
        deletePrompt: 'Delete Prompt',
        unsubscribe: 'UNSUB',

        // PublicLibrary
        publicDatabase: 'Public Database',
        publicDatabaseSubtitle: 'Access shared neural instructions from the network.',
        searchQuery: 'Search query...',
        all: 'All',
        work: 'Work',
        study: 'Study',
        creative: 'Creative',
        coding: 'Coding',
        saved: 'Saved',
        acquire: 'Acquire',
        view: 'View',
        bySystem: 'System',
        byUser: 'User',

        // Modal
        simulatedOutput: 'Simulated Output',
        aiResponsePrediction: 'AI Response Prediction',
        abort: 'Abort',
        confirmEntry: 'Confirm Entry',

        // Edit Prompt
        title: 'Title',
        operationName: 'Operation Name',
        targetCore: 'Target Core',
        sectorTag: 'Sector Tag',
        instructionSet: 'Instruction Set',
        inputSystemParameters: 'Input system parameters...',
        sampleAiResponse: 'Sample AI Response',
        inputPrewrittenResponse: 'Input pre-written AI response example...',

        // Tags
        general: 'General',
        design: 'Design',
        code: 'Code',
        react: 'React',
        writing: 'Writing',
        content: 'Content',

        // Confirmation
        confirmAction: 'Confirm Action',
        areYouSure: 'Are you sure you want to proceed?',
        deletePromptTitle: 'Delete Prompt',
        deletePromptMessage: 'Are you sure you want to delete this prompt? This action cannot be undone.',
        unsubscribePromptTitle: 'Unsubscribe Prompt',
        unsubscribePromptMessage: 'Are you sure you want to unsubscribe from this prompt?',
        clearUsageCountsTitle: 'Clear Usage Counts',
        clearUsageCountsMessage: 'Are you sure you want to clear all usage counts? This action cannot be undone.',
        resetUserDataTitle: 'Reset All User Data',
        resetUserDataMessage: 'Are you sure you want to reset all your data? This will delete all your saved prompts. This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Confirm',

        // Tutorial
        tutorialWelcomeTitle: 'Welcome to MuseMemo',
        tutorialWelcomeContent: 'This tutorial will guide you through the basics of discovering and managing prompts.',
        tutorialLibraryTitle: 'Nexus Library',
        tutorialLibraryContent: 'Click here to access the public database of neural instructions.',
        tutorialViewPromptsTitle: 'View Prompts',
        tutorialViewPromptsContent: 'Here you can browse available prompts. Each card shows the model, tags, and description.',
        tutorialPreviewTitle: 'Preview Prompt',
        tutorialPreviewContent: 'Click "View" to see a preview of what this prompt does.',
        tutorialClosePreviewTitle: 'Close Preview',
        tutorialClosePreviewContent: 'This shows you the prompt content and sample output. Click the X button to close.',
        tutorialAcquireTitle: 'Acquire Prompt',
        tutorialAcquireContent: 'Click the + button to save this prompt to your personal space.',
        tutorialMySpaceTitle: 'My Space',
        tutorialMySpaceContent: 'Now, let\'s go to your personal workspace to use your saved prompts.',
        tutorialSelectModelTitle: 'Select Model',
        tutorialSelectModelContent: 'Click on the ChatGPT bubble to view prompts for this AI model.',
        tutorialSelectCategoryTitle: 'Select Category',
        tutorialSelectCategoryContent: 'Click on the Tutorial category to view your tutorial prompt.',
        tutorialCopyTitle: 'Use Prompt',
        tutorialCopyContent: 'Click "COPY" to copy the prompt content to your clipboard.',
        tutorialCompleteTitle: 'Tutorial Complete',
        tutorialCompleteContent: 'You are now ready to use MuseMemo. Enjoy!',
        next: 'Next',
        finish: 'Finish',
    },
    zh: {
        // Layout
        appName: '缪斯备忘录',
        version: 'v2.1.0 [在线]',
        mySpace: '我的空间',
        nexusLibrary: '提示词库',
        tutorial: '新手教程',
        tutorialSubtitle: '学习基础操作',
        profile: '账户',
        logout: '登出',

        // Auth
        welcome: '欢迎使用缪斯备忘录',
        loginTitle: '登录',
        registerTitle: '注册账户',
        email: '邮箱',
        password: '密码',
        fullName: '姓名',
        loginButton: '登录',
        registerButton: '注册',
        switchToRegister: '还没有账户？立即注册',
        switchToLogin: '已有账户？立即登录',

        // Profile
        operatorProfile: '用户资料',
        secureSession: '安全会话已激活',
        protocolCount: '提示词数量',
        storedInstructions: '已存储指令',
        totalExecutions: '总执行次数',
        apiInteractions: 'API 交互次数',
        preferredCore: '偏好模型',
        mostUtilizedModel: '最常用模型',
        dataManagement: '数据管理',
        clearUsageCounts: '清除使用计数',
        resetAllUserData: '重置所有用户数据',
        terminateSession: '退出登录',
        freeTier: '免费版',
        proTier: '专业版',
        adminTier: '管理员',

        // MySpace
        selectNeuralCore: '选择AI模型',
        newPrompt: '新建提示词',
        systemsActive: '个提示词激活',
        recentUsage: '最近使用',
        copy: '复制',
        copied: '已复制',
        link: '链接',
        uses: '使用次数',
        editPrompt: '编辑提示词',
        deletePrompt: '删除提示词',
        unsubscribe: '取消订阅',

        // PublicLibrary
        publicDatabase: '公共提示词库',
        publicDatabaseSubtitle: '访问网络中共享的AI指令。',
        searchQuery: '搜索提示词...',
        all: '全部',
        work: '工作',
        study: '学习',
        creative: '创意',
        coding: '编程',
        saved: '已保存',
        acquire: '获取',
        view: '查看',
        bySystem: '系统',
        byUser: '用户',

        // Modal
        simulatedOutput: '模拟输出',
        aiResponsePrediction: 'AI 响应预测',
        abort: '取消',
        confirmEntry: '确认',

        // Edit Prompt
        title: '标题',
        operationName: '操作名称',
        targetCore: '目标模型',
        sectorTag: '分类标签',
        instructionSet: '指令集',
        inputSystemParameters: '输入系统参数...',
        sampleAiResponse: 'AI 响应示例',
        inputPrewrittenResponse: '输入预设的 AI 响应示例...',

        // Tags
        general: '通用',
        design: '设计',
        code: '代码',
        react: 'React',
        writing: '写作',
        content: '内容',

        // Confirmation
        confirmAction: '确认操作',
        areYouSure: '您确定要继续吗？',
        deletePromptTitle: '删除提示词',
        deletePromptMessage: '您确定要删除此提示词吗？此操作无法撤销。',
        unsubscribePromptTitle: '取消订阅提示词',
        unsubscribePromptMessage: '您确定要取消订阅此提示词吗？',
        clearUsageCountsTitle: '清除使用计数',
        clearUsageCountsMessage: '您确定要清除所有使用计数吗？此操作无法撤销。',
        resetUserDataTitle: '重置所有用户数据',
        resetUserDataMessage: '您确定要重置所有数据吗？这将删除您保存的所有提示词。此操作无法撤销。',
        cancel: '取消',
        confirm: '确认',

        // Tutorial
        tutorialWelcomeTitle: '欢迎使用缪斯备忘录',
        tutorialWelcomeContent: '本教程将引导您了解如何发现和管理提示词的基础知识。',
        tutorialLibraryTitle: '提示词库',
        tutorialLibraryContent: '点击这里访问公共AI指令数据库。',
        tutorialViewPromptsTitle: '浏览提示词',
        tutorialViewPromptsContent: '在这里您可以浏览可用的提示词。每张卡片显示模型、标签和描述。',
        tutorialPreviewTitle: '预览提示词',
        tutorialPreviewContent: '点击"查看"按钮预览此提示词的功能。',
        tutorialClosePreviewTitle: '关闭预览',
        tutorialClosePreviewContent: '这里显示提示词内容和示例输出。点击 X 按钮关闭。',
        tutorialAcquireTitle: '获取提示词',
        tutorialAcquireContent: '点击 + 按钮将此提示词保存到您的个人空间。',
        tutorialMySpaceTitle: '我的空间',
        tutorialMySpaceContent: '现在，让我们进入您的个人工作区使用已保存的提示词。',
        tutorialSelectModelTitle: '选择模型',
        tutorialSelectModelContent: '点击 ChatGPT 气泡查看此 AI 模型的提示词。',
        tutorialSelectCategoryTitle: '选择类别',
        tutorialSelectCategoryContent: '点击"教程"类别查看您的教程提示词。',
        tutorialCopyTitle: '使用提示词',
        tutorialCopyContent: '点击"复制"按钮将提示词内容复制到剪贴板。',
        tutorialCompleteTitle: '教程完成',
        tutorialCompleteContent: '您现在已准备好使用缪斯备忘录了。祝您使用愉快！',
        next: '下一步',
        finish: '完成',
    }
};
