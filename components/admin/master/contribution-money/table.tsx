const contribution_money = [
  { contribution_money: "Rp. 5.000", updated_date: "2018-07-15" },
  { contribution_money: "Rp. 2.000", updated_date: "-" },
];

export default function Table() {
  return (
    <div className="md:block overflow-x-auto bg-white rounded-xl shadow-sm md:pb-4">
      <table className="min-w-full table">
        <thead className="rounded-lg text-left text-sm font-normal">
          <tr className="border-b border-gray-200">
            <th scope="col" className="px-4 pl-6 py-5 font-medium">
              Contribution Money
            </th>
            <th scope="col" className="px-4 py-5 font-medium">
              Updated Date
            </th>
          </tr>
        </thead>
        <tbody>
          {contribution_money.map((contrib) => {
            return (
              <tr
                key={contrib.contribution_money + contrib.updated_date}
                className="w-full border-b border-gray-200 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
              >
                <td className="whitespace-nowrap px-4 pl-6 py-3">
                  {contrib.contribution_money}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  {contrib.updated_date}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
