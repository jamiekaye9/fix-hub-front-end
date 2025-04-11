import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";
import * as ticketService from "../../services/ticketService";
import styles from "./Dashboard.module.css";
import { PieChart, Pie, Legend, BarChart, Bar, Cell } from "recharts";

const Dashboard = () => {
  const [reportsData, setReportsData] = useState([]);
  const [animateData01, setAnimateData01] = useState([]);
  const [animateData02, setAnimateData02] = useState([]);
  const capitalise = (word) => word?.charAt(0).toUpperCase() + word?.slice(1);
  const splitCamelCase = (str) => {
    if (typeof str !== "string") return "";
    return str.replace(/([a-z0-9])([A-Z])/g, "$1 $2");
  };
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers);
      } catch (e) {
        console.log(e);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const tickets = await ticketService.index();
        setReportsData(tickets);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTickets();
  }, []);

  const data01 = (tickets) => {
    const filtered = tickets.filter(
      (ticket) => ticket.status === "open" || ticket.status === "inProgress"
    );
    return [
      {
        name: "Low",
        value: filtered.filter((ticket) => ticket.priority === "low").length,
        fill: "#4BDFE3",
      },
      {
        name: "Medium",
        value: filtered.filter((ticket) => ticket.priority === "medium").length,
        fill: "#707070",
      },
      {
        name: "High",
        value: filtered.filter((ticket) => ticket.priority === "high").length,
        fill: "#ffffff",
      },
    ];
  };

  const data02 = (tickets) => {
    return [
      {
        name: "Open",
        value: tickets.filter((t) => t.status === "open").length,
        fill: "#4BDFE3",
      },
      {
        name: "In Progress",
        value: tickets.filter((t) => t.status === "inProgress").length,
        fill: "#707070",
      },
      {
        name: "Resolved",
        value: tickets.filter((t) => t.status === "resolved").length,
        fill: "#ffffff",
      },
      {
        name: "Closed",
        value: tickets.filter((t) => t.status === "closed").length,
        fill: "#2a7e81",
      },
    ];
  };

  useEffect(() => {
    if (reportsData.length > 0) {
      setAnimateData01([])
      setAnimateData02([]);

      const timeoutId = setTimeout(() => {
        setAnimateData01(data01(reportsData));
        setAnimateData02(data02(reportsData));
      }
      , 100);
      return () => clearTimeout(timeoutId);
    }
    }, [reportsData]);

  return (
    <div className={styles.dashboardContainer}>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.dashboardContent}>
        <div className={styles.cardGrid}>
          <div className={styles.headerCard}>
            <p className={styles.item}>User</p>
            <p className={styles.item}>Username</p>
            <p className={styles.item}>Role</p>
          </div>
          <div className={styles.userCardContainer}>
            {users.length > 0 ? (
              users.map((u) => (
                <div className={styles.userCard} key={u._id}>
                  <p className={styles.item}>
                    {u.firstName} {u.lastName}
                  </p>
                  <p className={styles.item}>{u.username}</p>
                  <p className={styles.item}>
                    {splitCamelCase(capitalise(u.role))}
                  </p>
                </div>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </div>
        </div>
        <div className={styles.reports}>
          <div className={styles.pieChart}>
            <h2 className={styles.pieTitle}>Open Tickets by Priority</h2>
            <PieChart
              width={250}
              height={350}
              margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            >
              <Pie
                data={animateData01}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#4BDFE3"
                label
                labelLine={false}
                stroke="#000"
                strokeWidth={2}
                isAnimationActive={true}
                animationDuration={800}
                animationBegin={100}
              />
              <Legend
                verticalAlign="bottom"
                height={25}
                wrapperStyle={{ paddingTop: 10 }}
              />
            </PieChart>
          </div>
          <div className={styles.barChart}>
            <h2 className={styles.barTitle}>All Tickets by Status</h2>
            <div className={styles.barContent}>
              <BarChart
                width={600}
                height={320}
                data={animateData02}
                margin={{ top: 5, right: 30, left: 20, bottom: 40 }}
                barCategoryGap={50}
              >
                <Legend
                  payload={animateData02.map((item) => ({
                    value: item.name,
                    type: "circle",
                    id: item.name,
                    color: item.fill,
                  }))}
                  verticalAlign="bottom"
                  wrapperStyle={{ paddingTop: 20 }}
                />
                <Bar dataKey="value" name="Status" isAnimationActive={true} animationBegin={100} animationDuration={800}>
                  {animateData02.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
