import { useRouter } from "next/router";
import styles from "../../styles/packages.module.css";

export default function Packages() {
  const Router = useRouter();

  const goToPackage = (e) => {
    e.preventDefault();
    Router.push("/packages/react-next-table");
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <div className="col-12">
        <div className="row m-1">
          <div className="h1 col-4">Packages</div>
          <div className="col-8 mt-2 text-end">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>

      <div className="card pointer" onClick={goToPackage}>
        <div className="h5">react-next-table</div>
        <div>
          The SmartTable is a react simple Component based on HTML, CSS,
          JavaScript, bootstrap. Used for fetching data from a defined api with
          an option of pagination and search. You can find also many useful
          options like sorting, selecting columns to show, custom render of
          cells, fully responsive on all devices, custom react title...
        </div>
        <div className={styles.footer}>
          <img
            src="https://img.shields.io/npm/dm/react-next-table"
            alt="Downloads"
          />
          <img
            src="https://img.shields.io/github/stars/a-simplecode/react-next-table"
            alt="Github Stars"
          />
          <img
            src="https://img.shields.io/github/v/release/a-simplecode/react-next-table?label=latest"
            alt="Github Stable Release"
          />
          <img
            src="https://img.shields.io/github/v/release/a-simplecode/react-next-table?include_prereleases&label=prerelease&sort=semver"
            alt="Github Prelease"
          />
        </div>
      </div>
    </div>
  );
}
