import GroupTable from "../GroupTable";
import Modal from "../Modal";

import { faFilter, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const Payments = () => {
  const [showModal, setShowModal] = useState(true);

  const info = {
    headers: ["Album", "Name of bank", "Account number"],
    rows: [["111111", "Bank Test SA", "49 1020 2892 2276 3005 0000 0000"]],
  };

  const account = {
    headers: ["Bank name", "Account number", "Currency", "Confirmed"],
    rows: [
      ["Test I O. Warsaw", "49 1020 2892 2276 3005 0000 0000", "USD", "Yes"],
      ["Test I O. Warsaw", "49 1020 2892 2276 3005 0000 0000", "PLN", "Yes"],
    ],
  };

  const charges = {
    headers: ["Title", "Value", "Due date"],
    rows: [
      ["Activation of student card", "4.99 $", "25.04.2022"],
      ["Activation of student card", "4.99 $", "25.04.2022"],
    ],
  };

  return (
    <section
      className="payments-section"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <Modal show={showModal} onClose={() => setShowModal(!showModal)}>
        <p>TEST</p>
      </Modal>
      <GroupTable title="University information" object={info} />
      <GroupTable
        title="Your bank accounts"
        actionIcon={faPlusCircle}
        onAction={(e) => {
          e.stopPropagation();
          setShowModal(!showModal);
        }}
        object={account}
      />
      <GroupTable title="Your charges" actionIcon={faFilter} object={charges} />
    </section>
  );
};

export default Payments;
