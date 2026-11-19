"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const themes = [
  { value: "light", label: "亮色", icon: Sun },
  { value: "dark", label: "暗色", icon: Moon },
  { value: "system", label: "跟随系统", icon: Laptop },
];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const activeTheme = theme ?? "system";
  const active = themes.find((item) => item.value === activeTheme) ?? themes[2];
  const Icon = active.icon;

  return (
    <button
      type="button"
      className="icon-button"
      aria-label={`当前主题：${active.label}，点击切换`}
      title={`当前主题：${active.label}`}
      onClick={() => {
        const index = themes.findIndex((item) => item.value === activeTheme);
        setTheme(themes[(index + 1) % themes.length].value);
      }}
    >
      <Icon size={17} aria-hidden="true" />
    </button>
  );
}
