import { useState } from "react";

interface Props {
  name: string;
  news: string;
  extraNews?: string;
  breaking?: boolean;
  more?: boolean;
}

const TableRow = ({ name, news, breaking, more, extraNews }: Props) => {
  const [shownExtraNews, setShownExtraNews] = useState(false);
  return (
    <tr>
      <td className="w-0">
        <div className="flex items-center gap-1 text-nowrap">
          <div
            className={`w-2 h-2 rounded-full animate-pulse ${
              breaking ? "bg-red-600" : "bg-blue-600"
            }`}
          />
          {name}
        </div>
      </td>
      <td className={`ps-6 ${extraNews && "flex flex-col"}`}>
        <div className="flex">
          {news}
          {more ? (
            <span
              onClick={() => setShownExtraNews(!shownExtraNews)}
              className="text-blue-600 underline cursor-pointer ps-2"
            >
              المزيد
            </span>
          ) : (
            ""
          )}
        </div>
        <div>{shownExtraNews ? extraNews : ""}</div>
      </td>
    </tr>
  );
};

export default TableRow;
