"use client";

import { useToggleColorScheme } from "@/hooks/useColorScheme";
import { Switch } from "@headlessui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const InstaHeader = () => {
  const { isDarkMode, handleToggleColorScheme } = useToggleColorScheme();

  const pathname = usePathname();
  const id = pathname.split("/")[1];

  return (
    <div className="flex-none h-10 px-3 flex items-center">
      <Link href={`/${id}`}>
        <span>정현 & 카리나의 결혼식</span>
      </Link>
      <div className="ml-auto flex items-center">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
        >
          🚀
        </button>
        <Switch
          checked={isDarkMode}
          onChange={handleToggleColorScheme}
          className={({ checked }) => {
            const base = "relative flex h-6 w-11 items-center rounded-full";

            if (checked) {
              return `${base} bg-yellow-400`;
            }

            return `${base} bg-yellow-600`;
          }}
        >
          {({ checked }) => (
            <>
              <span className="sr-only">Dark Mode</span>
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                  checked ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </>
          )}
        </Switch>
      </div>
    </div>
  );
};

export default InstaHeader;
