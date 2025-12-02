# 国际化使用指南

## 已完成的工作

1. ✅ 创建了完整的中英文翻译文件 (`i18n/translations.ts`)
2. ✅ 创建了语言上下文和Provider (`i18n/LanguageContext.tsx`)
3. ✅ 创建了语言切换组件 (`components/LanguageSwitcher.tsx`)
4. ✅ 更新了 `App.tsx` 以包含 `LanguageProvider`
5. ✅ 更新了 `Layout.tsx` 使用翻译

## 如何在组件中使用翻译

### 1. 导入 useLanguage Hook

```tsx
import { useLanguage } from '../i18n/LanguageContext';
```

### 2. 在组件中使用

```tsx
export const YourComponent: React.FC = () => {
  const { t, language } = useLanguage();
  
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
};
```

## 需要翻译的组件列表

以下组件需要按照相同的模式进行翻译：

### 高优先级
- [ ] `views/Profile.tsx` - 用户资料页面
- [ ] `views/MySpace.tsx` - 我的空间页面
- [ ] `views/PublicLibrary.tsx` - 公共库页面
- [ ] `views/Auth.tsx` - 登录/注册页面
- [ ] `components/TutorialOverlay.tsx` - 教程覆盖层
- [ ] `components/ConfirmationModal.tsx` - 确认对话框

### 中优先级
- [ ] `components/Modal.tsx` - 模态框
- [ ] `store.tsx` - 教程提示词内容

## 翻译步骤示例

以 `Profile.tsx` 为例：

### 原代码：
```tsx
<h2 className="text-3xl">Operator Profile</h2>
<p>Secure Session Active</p>
```

### 翻译后：
```tsx
import { useLanguage } from '../i18n/LanguageContext';

export const ProfileView: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <>
      <h2 className="text-3xl">{t.operatorProfile}</h2>
      <p>{t.secureSession}</p>
    </>
  );
};
```

## 语言切换器位置

语言切换器已添加到：
- ✅ Layout 侧边栏底部（用户头像旁边）

## 翻译覆盖范围

所有翻译键已在 `i18n/translations.ts` 中定义，包括：
- 布局和导航
- 认证页面
- 用户资料
- 我的空间
- 公共库
- 模态框和确认对话框
- 教程步骤
- 标签和分类
- 按钮和操作

## 测试

切换语言后，以下内容应该改变：
1. 侧边栏导航项
2. 应用名称和版本
3. 教程按钮文本
4. 所有页面内容（待实现）

## 下一步

要完成完整的国际化，需要：
1. 在每个组件中导入 `useLanguage`
2. 将所有硬编码的英文文本替换为 `t.keyName`
3. 确保所有需要的翻译键都在 `translations.ts` 中定义
