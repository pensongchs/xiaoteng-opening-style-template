# 资源来源与使用说明

## 自有模板与脚本

本仓库自有的Skill指令、片头排版与动作实现、跨平台脚本采用根目录LICENSE中的MIT许可。第三方字体和背景各自适用原许可，根目录许可不替代其条件。

## 透明住宅示例

`public/assets/示例/`中的两张住宅由内置ImageGen生成，供本模板演示与学习使用，是房产类别视觉示意，不代表真实楼盘、品质、法规合规或成交事实。生成提示词与SHA-256保存在同目录素材说明中。

## 随包字体

仅包含片头实际使用的三款字体，保留文件原文，不改写字形或版权信息：

| 文件 | 字体 | 授权说明 |
| --- | --- | --- |
| JiangChengLvDongSong.ttf | 江城律动宋1.0，设计者刘鹏，基于Adobe思源宋体 | 字体内声明SIL Open Font License 1.1，附江城律动宋-OFL.txt |
| AlibabaHealth-Regular.ttf | 阿里健康体2.0常规，官方原文件AlibabaHealthFont2.0CN-45R.ttf | 附官方PDF字体使用说明 |
| AlibabaHealth-Bold.ttf | 阿里健康体2.0粗体，官方原文件AlibabaHealthFont2.0CN-85B.ttf | 附官方PDF字体使用说明 |

字体来源链接与文件校验见`scripts/fonts.json`。阿里健康体与官方发布压缩包文件一致；江城律动宋许可依据字体内置版权与许可字段，附原思源宋体OFL全文。字体只用于网页与视频加载，不执行系统级字体安装。继续分发字体时保留对应版权和许可。

## React Bits Gradient ASCII

官方项目：[DavidHDev/react-bits](https://github.com/DavidHDev/react-bits)。背景组件：`src/content/Backgrounds/GradientASCII/`。固定提交：`14330e6963f6c5ddd773ee2af844d0630c22b958`。作者及版权：David Haz。

官方采用[MIT + Commons Clause License Condition v1.0](https://github.com/DavidHDev/react-bits/blob/14330e6963f6c5ddd773ee2af844d0630c22b958/LICENSE.md)，对组件、移植版本及工具导出物的再次分发设有限制。因此本仓库提供官方获取位置、文件校验值和独立视频时钟适配逻辑；准备时在使用者本机获取，未将背景组件源文件作为模板资源再分发。官方下载的许可保存在工作工程`.runtime/React-Bits-LICENSE.md`，使用者须遵守该许可。

不要将运行后下载生成的`AsciiGradientBackground.jsx`、CSS、官方原文或背景缓存打成新的组件库或模板资源包。项目`.gitignore`已排除这些文件。许可中的应用使用条件以官方文件为准。

## Remotion、React与运行依赖

Remotion、React、TypeScript等由npm按锁文件下载，保留各包许可。Remotion的商业使用条件以[官方许可说明](https://www.remotion.dev/license)为准。`node_modules`、浏览器、编码器、缓存和本机环境记录不随仓库上传。
