import { X } from "lucide-react";

type CSVFullscreenProps = {
  data: string[][];
  onClose: () => void;
};

const CSVFullscreen = ({ data, onClose }: CSVFullscreenProps) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-10 flex items-center justify-center">
      <button
        onClick={onClose}
        className="absolute top-3 right-3 z-10 bg-red-500 text-white p-1.5 rounded hover:bg-red-600"
      >
        <X size={20} />
      </button>
      <div className="bg-white rounded-lg w-[95%] h-[90%] overflow-auto relative">
        <div className="p-4">
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
              {data.map((row, i) => (
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
        </div>
      </div>
    </div>
  );
};

export default CSVFullscreen;
