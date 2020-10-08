import Link from "next/link";

interface FixesTableProps {
  data: any[];
  withSelet?: {
    handleSelectedFix: (data: any, state?: boolean) => void;
    isSelectedFix: (id: string) => boolean;
    type?: "pay" | "select";
  };
}
const InstallmentsTable = ({ data, withSelet }: FixesTableProps) => {
  const ColumnToSelect = ({ row }) => {
    return (
      <td className="centerr">
        <input
          type="checkbox"
          className="w3-check"
          checked={withSelet.isSelectedFix(row.id)}
          onChange={(e) => withSelet.handleSelectedFix(row, e.target.checked)}
        />
      </td>
    );
  };
  return (
    <table className="w3-table-all w3-hoverable custom-table installments-table">
      <thead>
        <tr className="w3-teal">
          {withSelet && !withSelet.type && (
            <th className="centerr">قم بالتحديد</th>
          )}
          <th>اسم العميل</th>
          <th>قيمة الصيانة</th>
          <th>العنوان</th>
          <th>رابط التعديل</th>
          {withSelet && withSelet.type === "pay" && (
            <th className="centerr">تمت الصيانة؟</th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => {
          return (
            <tr key={row.id}>
              {withSelet && !withSelet.type && <ColumnToSelect row={row} />}
              <td>{row.customer.name}</td>
              <td>{row.price}</td>
              <td>{row.customer.address}</td>
              <td>
                <Link href={`/customers/${row.customer.id}/installments`}>
                  <a target="_blank" rel="noopener noreferrer">
                    اضغظ هنا
                  </a>
                </Link>
              </td>

              {withSelet && withSelet.type === "pay" && (
                <ColumnToSelect row={row} />
              )}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default InstallmentsTable;
