"use client";

import NavSection from "@/app/ui/NavSection";
import { User } from "@supabase/supabase-js";
import ViewableSection from "../ViewableSection";

type Props = {
  user: User | null;
};

const ScrollView = ({ user = null }: Props) => {
  return (
    <>
      <ViewableSection sectionName="section1">
        <h1 className="text-4xl font-semibold mb-10">
          내 청첩장을 &quot;보란말이야&quot;
        </h1>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xl text-slate-700 text-center leading-tight">
            그동안의 청첩장은 결혼식 안내를 위한 단순한 정보 뿐이었어요.
          </p>
          <p className="text-xl text-slate-700 text-center leading-tight">
            청첩장은 우리의 이야기를 담은 특별한 청첩장이 되어야 한다고
            생각했어요.
          </p>
          <p className="text-xl text-slate-700 text-center leading-tight">
            우리의 이야기를 알아갈 수록 우리의 결혼식에 참석하는 분들에게
          </p>
          <p className="text-xl text-slate-700 text-center leading-tight">
            진심어린 축하와 사랑을 받을 수 있을 거라고 생각했어요.
          </p>
          <p className="text-xl text-slate-700 text-center leading-tight">
            어떻게 하면 우리의 이야기를 담은 청첩장을 만들 수 있을까요?
          </p>
        </div>
      </ViewableSection>

      <ViewableSection sectionName="section2">
        <h1 className="text-4xl font-semibold mb-10">
          우리의 이야기를 담은 공간
        </h1>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xl text-slate-500 text-center leading-tight">
            많은 사람들이 자신의 이야기를 공유하는 공간이 어디인지 생각해봤어요.
          </p>
          <p className="text-xl text-slate-500 text-center leading-tight">
            사람들에게 익숙한 공간은 어디인지 생각해봤어요.
          </p>
          <p className="text-xl text-slate-500 text-center leading-tight">
            그동안 자신의 이야기를 공유하고, 익숙하게 여겼던 공간이 우리의
            이야기를 담기에 가장 적합한 공간이 아닐까요?
          </p>
        </div>
      </ViewableSection>

      <ViewableSection sectionName="section3">
        <h1 className="text-4xl font-semibold mb-10">익숙한 공간</h1>
        <div className="flex flex-col gap-1 items-center">
          <p className="text-xl text-slate-500 text-center leading-tight">
            우리의 이야기를 담은 청첩장은 인스타그램과 같은 공간이
            가장적합하다고 생각했어요.
          </p>
          <p className="text-xl text-slate-500 text-center leading-tight">
            인스타그램은 사람들이 자신의 이야기를 공유하는 공간이기 때문이에요.
          </p>

          <p className="text-xl text-slate-500 text-center leading-tight">
            우리만의 인스타그램 안에서 우리의 이야기를 담은 청첩장을
            만들어보세요.
          </p>
          <NavSection user={user} />
        </div>
      </ViewableSection>
    </>
  );
};

export default ScrollView;
