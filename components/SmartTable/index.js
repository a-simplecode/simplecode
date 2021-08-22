import { useEffect, useState } from "react";
import styles from "./SmartTable.module.css";

function SmartTable(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetchData();
  }, []);

const fetchData = (search)=>{
    try {
        fetch(props.url+(search ? "?search="+search: ""), {
          method: "get",
        })
          .then((response) => response.json())
          .then((data) => {
              console.log("data",data)
            setData((data && data.data) ?data.data: []);
          });
      } catch (e) {
        console.log("Fetch error", e.message);
      }
}

  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  const handleChange = debounce((event) => {
    const { value } = event.target;

    fetchData(value);
  }, props.searchDebounceTime ?? 300);

  return (
    <div className="col-12 p-4">
      <div className="row">
        <div className="col-6 h3">{props.title}</div>
        <div className="col-6 text-end">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className={styles.tableContainer}>
          <table className={styles.table+" table table-striped border"}>
            <thead className={styles.thead}>
              <tr>
                {props.headCells.map((headCell) => {
                  return (
                    <th
                      id={headCell.id}
                      key={headCell.id}
                      scope="col"
                      style={{ width: headCell.width ?? "auto" }}
                    >
                      {headCell.label}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {(data && data.length > 0) ? (
                data.map((row, idx) => {
                  return (
                    <tr key={"tr_" + idx}>
                      {props.headCells.map((headCell, idxx) => {
                        return (
                          <td key={"td_" + idx + "_" + idxx}>
                            {row[headCell.id]}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan={props.headCells.length} className="text-center">NO DATA FOUND</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SmartTable;
