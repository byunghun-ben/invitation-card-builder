/* eslint-disable react/button-has-type */

"use client";

import { Tab } from "@headlessui/react";
import { Loading } from "@/components/Loading";
import { logout } from "../action";

type Props = {
  isPending: boolean;
  onSubmit: () => void;
};

const TabSection = ({ isPending, onSubmit }: Props) => {
  return (
    <section className="basis-48 flex-none border-r">
      <div className="w-full flex flex-col gap-10 py-10">
        <Tab.List className="flex flex-col gap-4 pl-4">
          <Tab
            className={({ selected }) =>
              `flex text-left py-3 px-4 hover:bg-slate-50 ${
                selected ? "font-bold text-slate-900" : "text-slate-400"
              }`
            }
          >
            일반
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex text-left py-3 px-4 hover:bg-slate-50 ${
                selected ? "font-bold text-slate-900" : "text-slate-400"
              }`
            }
          >
            스토리
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex text-left py-3 px-4 hover:bg-slate-50 ${
                selected ? "font-bold text-slate-900" : "text-slate-400"
              }`
            }
          >
            게시물
          </Tab>
          <Tab
            className={({ selected }) =>
              `flex text-left py-3 px-4 hover:bg-slate-50 ${
                selected ? "font-bold text-slate-900" : "text-slate-400"
              }`
            }
          >
            결혼식장
          </Tab>
        </Tab.List>

        <div className="px-4 flex flex-col gap-2">
          <button
            type="button"
            className="border py-2 px-4 rounded-full hover:bg-slate-100"
            onClick={onSubmit}
            disabled={isPending}
          >
            {isPending ? (
              <Loading />
            ) : (
              <span className="font-bold">저장하기</span>
            )}
          </button>
          <button
            onClick={() => {
              logout();
            }}
            className="text-sm text-slate-700 self-center"
          >
            로그아웃
          </button>
        </div>
      </div>
    </section>
  );
};

export default TabSection;
