"use client";

import { searchLocalByKeyword } from "@/app/edit/[templateCode]/api";
import { LocalSearchKeywordDocumentType } from "@/schemas/kakaoMap";
import logger from "@/utils/logger";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Props = {
  onSelect: (item: LocalSearchKeywordDocumentType) => void;
};

const WeddingHallSearch = ({ onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weddingHallQuery, setWeddingHallQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const [searchResults, setSearchResults] = useState<
    LocalSearchKeywordDocumentType[]
  >([]);
  const [selectedItem, setSelectedItem] =
    useState<LocalSearchKeywordDocumentType | null>(null);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const showLoading = isLoading;
  const showEmpty = !isLoading && searchResults.length === 0;
  const showResults = !isLoading && searchResults.length > 0;

  const searchLocal = useCallback(async (query: string) => {
    const response = await searchLocalByKeyword(query);

    logger.log(response);
    setSearchResults(response.documents);
    setIsLoading(false);
  }, []);

  const debouncedSearchLocal = useMemo(() => {
    let timer: NodeJS.Timeout;

    return (query: string) => {
      clearTimeout(timer);

      const isQueryEmpty = query.trim().length === 0;
      if (isQueryEmpty) {
        setIsOpen(false);
        setIsLoading(false);
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setIsOpen(true);
      timer = setTimeout(() => {
        searchLocal(query);
      }, 500);
    };
  }, [searchLocal]);

  const handleWeddingHallQueryChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;

      setWeddingHallQuery(query);
      debouncedSearchLocal(query);
    },
    [debouncedSearchLocal],
  );

  const handleItemClick = useCallback(
    (item: LocalSearchKeywordDocumentType) => {
      logger.log("click", item);
      setSelectedItem(item);
      onSelect(item);
      setIsOpen(false);
    },
    [setSelectedItem, onSelect],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      logger.log("key down", e.key, searchResults.length);
      const isListEmpty = searchResults.length === 0;

      switch (e.key) {
        case "Escape": {
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        }

        case "ArrowDown": {
          e.preventDefault();
          setHighlightedIndex(prev => {
            if (isListEmpty) {
              return -1;
            }
            return Math.min(prev + 1, searchResults.length - 1);
          });
          break;
        }

        case "ArrowUp": {
          e.preventDefault();
          setHighlightedIndex(prev => {
            if (isListEmpty) {
              return -1;
            }
            return Math.max(prev - 1, 0);
          });
          break;
        }

        case "Enter": {
          e.preventDefault();
          if (
            highlightedIndex >= 0 &&
            highlightedIndex < searchResults.length
          ) {
            handleItemClick(searchResults[highlightedIndex]);
          }
          break;
        }

        default: {
          break;
        }
      }
    },
    [searchResults, handleItemClick, highlightedIndex],
  );

  // index가 변경되었을 때, listRef.current를 찾아서 해당 엘리먼트로 스크롤
  useEffect(
    function scrollListToHighlighted() {
      const listElement = listRef.current;
      logger.log("scroll", highlightedIndex, listElement);
      if (highlightedIndex < 0 || !listElement) {
        return;
      }

      const itemElement = listElement.children[highlightedIndex];

      if (!itemElement) {
        return;
      }

      itemElement.scrollIntoView({
        block: "nearest",
      });
    },
    [highlightedIndex],
  );

  return (
    <div className="relative">
      <label
        htmlFor="wedding-hall-address"
        className="relative h-12 flex items-center bg-white border rounded-md border-slate-200 overflow-hidden"
      >
        <div className="absolute left-2 top-3 p-1">
          <MagnifyingGlassIcon className="w-4 h-4 text-slate-500" />
        </div>
        <input
          ref={inputRef}
          type="text"
          name="wedding-hall-address"
          id="wedding-hall-address"
          className="w-full h-full pl-8 text-slate-700 rounded-md placeholder:text-sm placeholder:text-muted-foreground"
          placeholder="예식장 이름이나 주소를 입력해주세요."
          autoComplete="off"
          onChange={handleWeddingHallQueryChange}
          onKeyDown={handleKeyDown}
          onFocus={e => {
            const query = e.currentTarget.value || "";
            const isQueryEmpty = query.trim().length === 0;
            if (isQueryEmpty) {
              return;
            }
            setIsOpen(true);
          }}
          onBlur={e => {
            // item이 선택되었을 때, blur 이벤트가 발생하지 않도록
            if (e.relatedTarget) {
              logger.log("related target", e.relatedTarget);
              return;
            }

            setIsOpen(false);
          }}
          role="combobox"
          aria-autocomplete="list"
          aria-controls="combobox-list"
          aria-expanded={isOpen}
          aria-activedescendant={
            highlightedIndex > -1
              ? `combobox-item-${highlightedIndex}`
              : undefined
          }
        />
      </label>
      {isOpen && (
        <div className="absolute top-14 z-10 w-full rounded-lg border border-slate-200 shadow-xl bg-white">
          {showLoading && <span className="flex-center h-14">검색 중...</span>}
          {showEmpty && (
            <span className="flex-center h-14 text-slate-400">
              검색 결과가 없습니다.
            </span>
          )}
          {showResults && (
            <ul
              className="max-h-60 flex flex-col divide-y divide-slate-200 overflow-auto"
              ref={listRef}
            >
              {searchResults.map((item, index) => (
                <li key={item.id} className="flex flex-col">
                  <button
                    type="button"
                    className={`relative flex flex-col gap-0.5 w-full py-3 px-4 ${highlightedIndex === index ? "bg-slate-100" : "bg-white"}`}
                    onClick={() => {
                      handleItemClick(item);
                    }}
                    role="option"
                    aria-selected={selectedItem?.id === item.id}
                  >
                    <p className="text-sm text-slate-700 font-medium">
                      {item.place_name}
                    </p>
                    <p className="text-sm text-slate-500">
                      {item.address_name}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default WeddingHallSearch;
