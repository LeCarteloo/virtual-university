import Table from "./Table";
import "../styles/groupTable.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Loading from "./Loading";
import NoData from "./tables/NoData";

const GroupTable = ({
  title,
  tableData,
  dataKeys,
  tableHeaders,
  actionIcon,
  onAction,
  isCollapsed,
  tabOrient,
  children,
}) => {
  const [collapse, setCollapse] = useState(isCollapsed);

  return (
    <div className={`table-group ${!collapse && "open"}`}>
      <div className="header" onClick={() => setCollapse(!collapse)}>
        <span> {title} </span>
        <div className="icon-group">
          {actionIcon && (
            <button className="action-btn" onClick={onAction}>
              <FontAwesomeIcon
                style={{ marginRight: "0.5em" }}
                icon={actionIcon}
                size="xl"
              />
            </button>
          )}
          <FontAwesomeIcon
            className="group-accor"
            icon={faAngleDown}
            size="lg"
          />
        </div>
      </div>
      <div className="content">
        {tableData && dataKeys
          ? tableData.map((tableRow, i) => (
              <Table
                key={i}
                headers={tableHeaders}
                rows={dataKeys.map((key) => {
                  return tableRow[key];
                })}
                orient={tabOrient}
              />
            ))
          : tableData && (
              <Table
                headers={tableHeaders}
                rows={tableData}
                orient={tabOrient}
              />
            )}
        {!children && !tableData && <Loading />}
        {!children && tableData && tableData.length === 0 && <NoData />}
      </div>
    </div>
  );
};

GroupTable.defaultProps = {
  isCollapsed: true,
};

export default GroupTable;
