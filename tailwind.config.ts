// Tailwind CSS v4 配置
// v4 使用 CSS 优先的配置方式，大部分配置移到 CSS 文件中

const { heroui } = require("@heroui/react");

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'harmony': ['HarmonyOS Sans SC', 'system-ui', 'sans-serif'],
        'sans': ['HarmonyOS Sans SC', 'system-ui', 'sans-serif'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            primary: "#7DA84C", // 使用项目的主色调
            secondary: "#6a8f3f",
            background: "#ffffff",
            foreground: "#11181C",
          }
        },
        dark: {
          colors: {
            primary: "#7DA84C",
            secondary: "#6a8f3f", 
            background: "#000000",
            foreground: "#ECEDEE",
          }
        },
      },
    }),
  ],
}
