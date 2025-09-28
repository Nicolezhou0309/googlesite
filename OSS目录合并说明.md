# OSS目录合并操作说明

## 问题描述
OSS中有两个一级目录：
- `/images/` - 外部的一级images目录
- `/public/images/` - public目录下的images子目录

需要将外部的 `images/` 目录合并到 `public/images/` 目录中。

## 操作步骤

### 1. 设置环境变量
```bash
export OSS_ACCESS_KEY_ID="your_access_key_id"
export OSS_ACCESS_KEY_SECRET="your_access_key_secret"
```

### 2. 预览合并操作
```bash
node scripts/preview-oss-merge.js
```

这个脚本会：
- 列出源目录 `/images/` 下的所有文件
- 显示文件结构和统计信息
- 检查潜在的文件冲突
- 预览合并计划

### 3. 执行合并操作
```bash
node scripts/merge-oss-images.js
```

这个脚本会：
- 将 `/images/` 目录下的所有文件复制到 `/public/images/` 目录
- 保持原有的目录结构
- 跳过已存在的文件（避免覆盖）
- 显示详细的进度和结果统计

## 合并规则

1. **目录结构保持**: 源文件的相对路径结构会被保留
   - `images/communities/jingan-center/缩略图/1.png`
   - `-> public/images/communities/jingan-center/缩略图/1.png`

2. **冲突处理**: 如果目标位置已存在文件，会跳过复制（不覆盖）

3. **批量操作**: 支持大量文件的批量复制

## 安全措施

1. **预览功能**: 先预览再执行，避免误操作
2. **不删除源文件**: 合并后不会自动删除源目录，需要手动验证后删除
3. **错误处理**: 详细的错误日志和统计信息

## 验证结果

合并完成后，建议：
1. 在OSS控制台中验证文件是否正确复制
2. 测试网站功能是否正常
3. 确认无误后，手动删除源目录 `/images/`

## 注意事项

- 确保有足够的OSS存储空间
- 大文件复制可能需要较长时间
- 建议在低峰期执行操作
- 保留操作日志以备查证
