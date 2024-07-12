import { MapIcon } from "@heroicons/react/24/outline";

type Props = {
  metaTitle: string;
};

const InstaHeader = ({ metaTitle }: Props) => {
  return (
    <div className="flex-none h-10 px-3 flex items-center bg-white">
      <span className="text-sm font-bold text-slate-700">{metaTitle}</span>
      <div className="ml-auto flex items-center">
        <button
          type="button"
          className="p-2 hover:bg-gray-100 dark:hover:bg-slate-900 rounded"
          aria-label="지도"
        >
          <MapIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InstaHeader;
