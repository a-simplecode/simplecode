import { useEffect, useState } from "react";
import SVGArrowDown from "./icons/SVGArrowDown";
import SVGArrowUp from "./icons/SVGArrowUp";
import SVGChevronLeft from "./icons/SVGChevronLeft";
import SVGChevronRight from "./icons/SVGChevronRight";
import styles from "./SmartTable.module.css";

function SmartTable(props) {
  const [loading, setLoading] = useState(false);
  const [sortDesc, setSortDesc] = useState({});
  const [tableWidth, setTableWidth] = useState(1000);
  const [data, setData] = useState([]);

  const [search, setSearch] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage ?? 10);
  const [rowsPerPageOptions] = useState(
    props.rowsPerPageOptions ?? [5, 10, 25, 50]
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    tableWidthFunc();
    fetchData();
  }, [props.url, props.headCells]);

  const fetchData = async (queryString) => {
    setLoading(true);

    try {
      const response = await fetch(
        props.url + (queryString ? queryString : ""),
        {
          method: "get",
        }
      );
      const data = await response.json();
      setData(data && data.data ? data.data : []);
    } catch (e) {
      console.log("Fetch error", e.message);
    }
    setLoading(false);
  };

  const buildQueryString = (search, page, rowsPerPage) => {
    const queries = [];

    if (page) queries.push(`page=${page}`);
    if (rowsPerPage) queries.push(`limit=${rowsPerPage}`);
    if (search) queries.push(`search=${search.toLowerCase()}`);

    const queryString = queries.join("&");

    return queryString ? `?${queryString}` : "";
  };

  const tableWidthFunc = () => {
    let tempTableWidth = 0;
    props.headCells.map((cell) => {
      tempTableWidth += cell.width;
    });

    if (tempTableWidth) setTableWidth(tempTableWidth);
  };

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
    setSearch(value);
    fetchData(buildQueryString(value,page,rowsPerPage));
  }, props.searchDebounceTime ?? 300);

  const sortData = (cell) => {
    let tempData = [...data];

    tempData.sort((a, b) => {
      if (sortDesc[cell]) {
        return a[cell].toLowerCase() < b[cell].toLowerCase() ? 1 : -1;
      } else {
        return a[cell].toLowerCase() > b[cell].toLowerCase() ? 1 : -1;
      }
    });
    setSortDesc({ [cell]: !sortDesc[cell] });
    setData(tempData);
  };

  return (
    <div className="col-12 p-4">
      <div className={styles.container + " row"}>
        <div className="col-12">
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
          <div className={styles.relative + " row mt-3"}>
            <div className={styles.tableContainer}>
              <table
                className={styles.table + " table table-striped border"}
                style={{ minWidth: tableWidth }}
              >
                {loading && (
                  <thead className={styles.loaderContainer + " text-primary"}>
                    <tr className="spinner-border" role="status"></tr>
                  </thead>
                )}
                <thead className={styles.thead}>
                  <tr>
                    {props.headCells.map((headCell) => {
                      return (
                        <th
                          id={headCell.id}
                          key={headCell.id}
                          scope="col"
                          style={{ width: headCell.width ?? "auto" }}
                          className={styles.pointer}
                          onClick={() => sortData(headCell.id)}
                        >
                          {headCell.label}
                          {sortDesc[headCell.id] ? (
                            <SVGArrowDown />
                          ) : sortDesc[headCell.id] === undefined ? (
                            ""
                          ) : (
                            <SVGArrowUp />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {data && data.length > 0 ? (
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
                    <tr>
                      <td
                        colSpan={props.headCells.length}
                        className="text-center"
                      >
                        NO DATA FOUND
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-12 text-end p-3">
              <span>
                Rows per page:{" "}
                <select
                  name="rowsPerPage"
                  value={rowsPerPage}
                  onChange={(e) => {
                    setRowsPerPage(e.target.value);
                    fetchData(buildQueryString(search, page, e.target.value));
                  }}
                >
                  {rowsPerPageOptions.map((nbr) => {
                    return <option value={nbr}>{nbr}</option>;
                  })}
                </select>
              </span>
              <span className="ms-4">1-10 of 14</span>
              <span
                className={styles.pointer + " ms-4"}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <SVGChevronLeft />
              </span>
              <span
                className={styles.pointer + " ms-4"}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <SVGChevronRight />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmartTable;
