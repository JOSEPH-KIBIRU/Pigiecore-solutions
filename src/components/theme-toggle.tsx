"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Sun, Moon, Monitor, Check, ChevronDown } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme-context";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export default function ThemeToggle() {
  const { theme, resolved, setTheme } = useTheme();
  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];
  const CurrentIcon = current.icon;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Toggle theme"
          className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <CurrentIcon className="w-5 h-5" />
          <ChevronDown className="w-3 h-3 hidden sm:block" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="z-[80] min-w-[150px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-700 dark:bg-slate-900"
        >
          {OPTIONS.map((opt) => {
            const Icon = opt.icon;
            const isActive = theme === opt.value;
            return (
              <DropdownMenu.Item
                key={opt.value}
                onSelect={() => setTheme(opt.value)}
                className="flex cursor-pointer items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 outline-none transition-colors hover:bg-sky-50 hover:text-sky-600 data-[highlighted]:bg-sky-50 data-[highlighted]:text-sky-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-sky-400 dark:data-[highlighted]:bg-slate-800 dark:data-[highlighted]:text-sky-400"
              >
                <Icon className="w-4 h-4" />
                {opt.label}
                {isActive && <Check className="w-4 h-4 ml-auto text-sky-500" />}
              </DropdownMenu.Item>
            );
          })}
          <DropdownMenu.Separator className="my-1 h-px bg-slate-100 dark:bg-slate-800" />
          <div className="px-3 py-1.5 text-[11px] text-slate-400 dark:text-slate-500">
            {resolved === "dark" ? "Dark mode active" : "Light mode active"}
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}