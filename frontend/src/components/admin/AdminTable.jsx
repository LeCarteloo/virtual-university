import "../../styles/admin.scss";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Empty from "../../assets/empty.svg";
import {
  faEye,
  faEllipsis,
  faGear,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import SearchInput from "../SearchInput";
import Loading from "../Loading";
import Modal from "../Modal";
import Input from "../Input";
import Pagination from "../Pagination";
import ActionButton from "../buttons/ActionButton";
import NoData from "../tables/NoData";

const AdminTable = ({ title, data, headers, onAdd, onEdit, onRemove }) => {
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // States for keeping the order state and the filtered data
  const [order, setOrder] = useState(1);
  const [items, setItems] = useState();
  const [modal, setModal] = useState({ show: false, data: {} });

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const current = items && items.slice(indexOfFirst, indexOfLast);

  // Refreshing component after data changes
  useEffect(() => {
    setItems(data);
  }, [data]);

  // Function for sorting columns (ASC / DESC)
  const sortColumn = (column) => {
    const sortedItems = items.sort((a, b) =>
      a[column] > b[column] ? order : -order
    );
    setItems(sortedItems);
    setOrder(-order);
  };

  // Searching function for search input
  const onSearch = (value) => {
    if (value !== "") {
      const searchData = data.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(value.toLowerCase());
      });
      setItems(searchData);
    } else {
      setItems(data);
    }
  };

  // Changing state of currentPage
  const paginate = (number) => {
    setCurrentPage(number);
  };

  // Display modal
  const displaySeeModal = (items) => {
    if (!items) {
      return;
    }

    return (
      <Modal
        title={"More details"}
        show={modal.show}
        onClose={() => setModal({ show: false, data: {} })}
      >
        {Object.keys(items).map((itemKey, i) => {
          if (Array.isArray(items[itemKey])) {
            return (
              <details key={`array-details-${i}`}>
                <summary>{itemKey.toString()}</summary>
                <div>
                  {items[itemKey].map((obj, j) => (
                    <div key={`array-div-${j}`} className="array-display">
                      {Object.keys(obj).map(
                        (objKey, k) =>
                          objKey !== "_id" && (
                            <Input
                              key={`array-input-${k}`}
                              label={objKey.toString()}
                              labelBg="#2f3142"
                              value={obj[objKey] !== null ? obj[objKey] : "-"}
                              readOnly={true}
                            />
                          )
                      )}
                    </div>
                  ))}
                </div>
              </details>
            );
          } else if (typeof items[itemKey] === "object") {
            return (
              <details key={`object-details-${i}`}>
                <summary>{itemKey.toString()}</summary>
                <div>
                  <div className="array-display">
                    {Object.keys(items[itemKey]).map(
                      (objKey, k) =>
                        objKey !== "_id" && (
                          <Input
                            key={`array-input-${k}`}
                            label={objKey.toString()}
                            labelBg="#2f3142"
                            value={
                              items[itemKey][objKey] !== null
                                ? items[itemKey][objKey]
                                : "-"
                            }
                            readOnly={true}
                          />
                        )
                    )}
                  </div>
                </div>
              </details>
            );
          } else {
            return (
              <Input
                key={`modal-input-${i}`}
                label={itemKey.toString()}
                value={items[itemKey].toString()}
                readOnly={true}
              />
            );
          }
        })}
      </Modal>
    );
  };

  // Open modal and display provided data
  const onSee = (id) => {
    // Searching for data with given id and removing _id from data
    const { _id, ...foundData } = data.find((obj) => obj._id === id);
    setModal({ show: !modal.show, data: foundData });
  };

  return (
    <>
      <div className="table-wrapper">
        <div className="wrapper-header">
          <h2 className="table-title"> {title} </h2>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button className="btn-add" onClick={onAdd}>
              <FontAwesomeIcon icon={faPlus} size={"lg"} />
            </button>
            <SearchInput
              placeholder={`Search for ${title.toLowerCase()}...`}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="table-slider">
          <table className="table-normal">
            <tbody>
              <tr>
                {headers &&
                  headers.map((header, key) => (
                    <th
                      key={`header-${key}`}
                      onClick={() => sortColumn(header.toLowerCase())}
                    >
                      {header}
                    </th>
                  ))}
                <th>Action</th>
              </tr>
              {current &&
                current.map((item, i) => (
                  <tr key={`row-${i}`}>
                    {headers.map((header, j) => (
                      <td key={`cell-${j}`}>{item[header.toLowerCase()]}</td>
                    ))}
                    <td>
                      <ActionButton
                        onSee={() => onSee(item._id)}
                        onEdit={() => onEdit(item._id)}
                        onRemove={() => onRemove(item._id)}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {items && items.length !== 0 && (
            <Pagination
              total={data.length}
              perPage={rowsPerPage}
              current={currentPage}
              setCurrent={setCurrentPage}
              paginate={paginate}
              setRows={setRowsPerPage}
            />
          )}
          {!items ? <Loading /> : items.length === 0 && <NoData />}
        </div>
      </div>
      {modal.show && displaySeeModal(modal.data)}
    </>
  );
};

export default AdminTable;
