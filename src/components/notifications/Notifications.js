import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

import NotificationItem from "./NotificationItem";

import "../../styles/notifications.scss";

const Notifications = ({ notifs }) => {
  const [notif, setNotif] = useState(false);

  return (
    <div className="notifications">
      <FontAwesomeIcon
        icon={faBell}
        size="xl"
        className="notif-icon"
        onClick={() => setNotif(!notif)}
      />
      <span className="notif-amount show">{notifs.length}</span>
      <div className={`notif-tooltip ${notif && "open"}`}>
        <div className="tooltip-header">Notifications</div>
        <div className="tooltip-content">
          {notifs.map((notif) => (
            <NotificationItem key={notif.id} {...notif} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
