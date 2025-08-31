import { Expand } from "lucide-react";

type CSVPreviewProps = {
  data: string[][];
  onExpand: () => void;
};

const CSVPreview = ({ data, onExpand }: CSVPreviewProps) => {
  return (
    <div className="my-4 border border-brand-grey rounded-lg max-h-70 overflow-y-auto overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-200 sticky top-0">
          <tr>
            {Object.keys(data[0]).map((key) => (
              <th
                key={key}
                className="border border-gray-300 px-3 py-2 text-left font-semibold text-black"
              >
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((row, i) => (
            <tr key={i} className="odd:bg-white even:bg-gray-50">
              {Object.values(row).map((val, j) => (
                <td
                  key={j}
                  className="border border-gray-300 px-3 py-2 text-black"
                >
                  {String(val)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Expand Button */}
      <button onClick={onExpand} className="absolute bottom-2 right-2  p-1.5">
        <Expand size={20} />
      </button>
    </div>
  );
};

export default CSVPreview;
