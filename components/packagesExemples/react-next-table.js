import SmartTable from "react-next-table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { getSession } from "next-auth/client";
dayjs.extend(utc);
dayjs.extend(timezone);

const headCells = [
  {
    id: "email",
    numeric: false,
    label: "Email",
    width: 200,
  },
  {
    id: "name",
    numeric: false,
    label: "Name",
    width: 150,
  },
  {
    id: "phone",
    numeric: false,
    label: "Phone",
    width: 100,
  },
  {
    id: "subject",
    numeric: false,
    label: "Subject",
    width: 300,
  },
  {
    id: "message",
    numeric: false,
    label: "Message",
    width: 700,
  },
  {
    id: "date",
    numeric: false,
    label: "Date",
    render: (row)=> <div className="text-center">{dayjs(row.date).format("DD/MM/YYYY HH:mm:ss")}</div>,
    width: 300,
  },
];

export default function Exemple() {
  return (
    <SmartTable
      title="Emails"
      url="/api/packages/react-next-table"
      headCells={headCells}
      searchDebounce={900}
      rowsPerPage={5}
      rowsPerPageOptions={[2,5,10,15]}
    />
  );
}
