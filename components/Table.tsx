import { Waypoint } from "react-waypoint";
interface TableHead {
  title: string;
  width: string;
}

interface TableProps {
  heads: TableHead[];
  data: any;
  loadMore: () => void;
  linkBeginning: string;
  noWrap?: boolean;
  withoutId?: boolean;
}
const Table = ({
  heads,
  data,
  loadMore,
  linkBeginning,
  noWrap,
  withoutId,
}: TableProps) => {
  if (withoutId) {
    heads = heads.filter((head) => head.title !== "الكود");
  }
  return (
    <table
      className={`w3-table-all w3-hoverable custom-table ${
        noWrap ? "noWrap" : ""
      }`}
    >
      <thead>
        <tr className="w3-green">
          {heads.map((head, index) => (
            <th key={index} style={{ width: head.width || "" }}>
              {head.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row: any, rowIndex: number) => {
          return (
            <tr
              key={rowIndex}
              onClick={() =>
                window.location.replace(`${linkBeginning}/${row.id}`)
              }
            >
              {Object.keys(row)
                .filter((row) => row !== "__typename")
                .map((column, columnIndex, arr) => {
                  if (withoutId && column === "id") return null;
                  return (
                    <td key={columnIndex}>
                      {typeof row[column] === "object"
                        ? row[column]?.name
                        : row[column]}
                      {columnIndex === arr.length - 1 && (
                        <Waypoint onEnter={() => loadMore()} />
                      )}
                    </td>
                  );
                })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default Table;
