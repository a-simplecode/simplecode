---
title: 'This is the post title'
date: '2022-10-15'
selected: true  #mark the files i want
---


# This is a title

This is some regular text with a [link](https://google.com)

![this is an image](/images/admin-login.jpeg)


... More content ...

```js

import { useEffect, useState } from "react";
import SVGArrowDown from "../icons/SVGArrowDown";
import SVGArrowUp from "../icons/SVGArrowUp";
import styles from "./SmartTable.module.css";

function SmartTable(props) {
  const [loading, setLoading] = useState(false);
  const [sortDesc, setSortDesc] = useState({});
  const [tableWidth, setTableWidth] = useState(1000);
  const [data, setData] = useState([]);

  useEffect(() => {
    tableWidthFunc();
    fetchData();
  },[]);

  const fetchData = (search) => {
    setLoading(true);
    try {
      fetch(props.url + (search ? "?search=" + search : ""), {
        method: "get",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data && data.data ? data.data : []);
          setLoading(false);
        });
    } catch (e) {
      console.log("Fetch error", e.message);
      setLoading(false);
    }
  };

  const tableWidthFunc = ()=>{
    let tempTableWidth = 0;
    props.headCells.map((cell)=>{
      tempTableWidth += cell.width
    })

    if(tempTableWidth) setTableWidth(tempTableWidth);
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

  const sortData = (cell) => {
    let tempData = [...data];

    tempData.sort((a, b) => {
      if (sortDesc[cell]) {
        return a[cell].toLowerCase() < b[cell].toLowerCase() ? 1 : -1;
      } else {
        return a[cell].toLowerCase() > b[cell].toLowerCase() ? 1 : -1;
      }
    });
    setSortDesc({[cell] :!sortDesc[cell]})
    setData(tempData);
  };

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
      <div className={styles.relative + " row mt-3"}>
        <div className={styles.tableContainer}>
          <table className={styles.table + " table table-striped border"} style={{minWidth: tableWidth}}>
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
                      {sortDesc[headCell.id] ? <SVGArrowDown />: sortDesc[headCell.id] === undefined ? "" : <SVGArrowUp />}
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
                  <td colSpan={props.headCells.length} className="text-center">
                    NO DATA FOUND
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SmartTable;


```


```css

.tableContainer{
    max-height: 83vh !important;
    min-width: 97vw !important;
    overflow: scroll;
    padding-right: 0;
    padding-left: 0;
    border: 1px solid lightgrey;
    box-shadow: 0 5px 25px 0 rgba(0, 113, 243,.4);

}

.tableContainer::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 5px;
    height: 5px;
  }
  
  .tableContainer::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: rgba(6, 66, 247, 0.5);
    box-shadow: 0 0 1px rgba(6, 66, 247, 0.5);
    -webkit-box-shadow: 0 0 1px rgba(6, 66, 247, 0.5);
  }

.table{
    border-collapse: separate;
    margin-bottom: 0;
}

.thead{
    position: sticky;
    top: 0;
    left: 0;
    background-color: white;
}

.relative{
    position: relative;
  }
  
  .pointer{
      cursor: pointer;
  }
  
  .loaderContainer{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(127,127,127,0.5);
    z-index: 3;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  

```