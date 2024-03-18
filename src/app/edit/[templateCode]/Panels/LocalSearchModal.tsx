"use client";

import { LocalSearchKeywordDocumentType } from "@/schemas/kakaoMap";
import { Dialog, Transition } from "@headlessui/react";
import { FormEvent, Fragment, useCallback, useState } from "react";
import { searchLocalByKeyword } from "../api";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: ({ name, address }: { name: string; address: string }) => void;
};

const LocalSearchModal = ({ isOpen, onClose, onSelect }: Props) => {
  // SearchLogic
  const [searchFetched, setSearchFetched] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [result, setResult] = useState<LocalSearchKeywordDocumentType[]>([]);

  const handleClose = useCallback(() => {
    setSearchFetched(false);
    setSearchLoading(false);
    setResult([]);
    onClose();
  }, [onClose]);

  const handleSearch = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const keyword = formData.get("keyword");

    if (!keyword || typeof keyword !== "string") {
      return;
    }

    setSearchLoading(true);

    const { documents: searchResult } = await searchLocalByKeyword(keyword);

    setResult(searchResult);
    setSearchLoading(false);
    setSearchFetched(true);
  }, []);

  const handleSelectSearchResult = useCallback(
    (local: LocalSearchKeywordDocumentType) => () => {
      onSelect({
        name: local.place_name,
        address: local.address_name,
      });
      handleClose();
    },
    [onSelect, handleClose],
  );
  // SearchLogic

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog className="relative z-10" onClose={handleClose}>
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg p-4 rounded border bg-white">
            <Dialog.Title className="text-xl font-bold mb-4">
              카카오 검색
            </Dialog.Title>
            <Dialog.Description className="mb-1 text-sm">
              웨딩홀 이름을 입력해주세요.
            </Dialog.Description>

            <form onSubmit={handleSearch} className="flex items-center gap-4">
              <input
                type="text"
                name="keyword"
                placeholder="ex) 보란말이야 웨딩홀"
                className="flex-1 w-full px-3 py-2 border rounded"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={searchLoading}
                className="px-4 py-2 border rounded hover:bg-slate-50"
              >
                <span className="text-sm font-bold">검색</span>
              </button>
            </form>

            {searchFetched && (
              <div className="flex flex-col gap-2 mt-4 border rounded max-h-60 overflow-y-scroll">
                {result.map(local => (
                  <button
                    key={local.id}
                    className="flex flex-col gap-1 px-2 py-1 hover:bg-slate-50"
                    type="button"
                    onClick={handleSelectSearchResult(local)}
                  >
                    <span className="text-sm font-bold">
                      {local.place_name}
                    </span>
                    <span className="text-xs">{local.address_name}</span>
                  </button>
                ))}

                {result.length === 0 && (
                  <div className="flex flex-col gap-1 p-4">
                    <p>
                      검색 결과가 없습니다, 이름과 주소를 직접 입력해주세요.
                    </p>
                    <form
                      onSubmit={e => {
                        e.preventDefault();

                        const formData = new FormData(e.currentTarget);

                        const name = formData.get("wedding-hall-name");
                        const address = formData.get("wedding-hall-address");

                        if (!name || !address) {
                          return;
                        }

                        if (
                          typeof name !== "string" ||
                          typeof address !== "string"
                        ) {
                          return;
                        }

                        console.log({ name, address });

                        onSelect({
                          name,
                          address,
                        });

                        handleClose();
                      }}
                      className="flex flex-col gap-2"
                    >
                      <input
                        type="text"
                        name="wedding-hall-name"
                        placeholder="웨딩홀 이름"
                        className="px-3 py-1 border"
                        autoComplete="off"
                      />
                      <input
                        type="text"
                        name="wedding-hall-address"
                        placeholder="웨딩홀 주소"
                        className="px-3 py-1 border"
                        autoComplete="off"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 border rounded hover:bg-slate-50"
                      >
                        <span className="text-sm font-bold">확인</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LocalSearchModal;
