import React, { useState, useEffect } from "react";
import "./App.css";
import data from "./data";
function RewardPoints() {
  const [allTransactions, setTransactions] = useState({});
  const [userTransactions, setUserTransactions] = useState([]);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [threeMonthData, setThreeMonthData] = useState({});
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  
  useEffect(() => {
    const fetchTransactions = async () => {
      setTransactions({ ...data });
    };
    fetchTransactions();
    setUsers([...Object.keys(data)]);
  }, []);
  /// Below code calculates rewards based upon provided example from the assignment
  const calculateRewardPoints = (amount) => {
    let rewardPoints = 0;
    if (amount >= 50) {
      // plus 1 point for every dollar spent over $50 in each transaction
      rewardPoints = Math.min(amount - 50, 50);
      // A customer receives 2 points for every dollar spent over $100 in each transaction
      if (amount > 100) {
        rewardPoints = rewardPoints + (amount - 100) * 2;
      }
    }
    return rewardPoints;
  };

  /// Below code is for user selection dropdown
  const selectUser = (selectedUser) => {
    setCurrentUser(selectedUser);
    let userData = allTransactions[selectedUser];
    let threeMonthPeriod = {};
    userData.forEach((tr) => {
      let transactionDate = new Date(tr.date);
      const monthName = monthNames[transactionDate.getMonth()];
      console.log(monthName);
      threeMonthPeriod = {
        ...threeMonthPeriod,
        [monthName]: {
          amount: (threeMonthPeriod[monthName]?.amount || 0) + tr.amount,
          rewardPoints:
            (threeMonthPeriod[monthName]?.rewardPoints || 0) +
            calculateRewardPoints(tr.amount),
        },
      };
    });
    console.log(threeMonthPeriod);
    setThreeMonthData(threeMonthPeriod);
    setUserTransactions([...userData]);
  };
  return (
    <>
      {" "}
      <h2 style={{ textAlign: "center" }}>
        User Rewards Program Dashborad
      </h2>{" "}
      <div className="drop-down">
        {" "}
        <label>Selected User : </label>{" "}
        <div className="select-style">
          {" "}
          <select
            onChange={(e) => selectUser(e.target.value)}
            value={currentUser}
          >
            {" "}
            <option value="" disabled>
              {" "}
              Select User
            </option>{" "}
            {users.map((item, index) => {
              return (
                <option key={index} value={item}>
                  {" "}
                  {item.toUpperCase()}{" "}
                </option>
              );
            })}
          </select>{" "}
        </div>{" "}
      </div>{" "}
      {Object.keys(threeMonthData).length > 0 && (
        <>
          {" "}
          <table className="customers">
            {" "}
            <thead>
              {" "}
              <tr>
                {" "}
                <th>Month</th> <th>Rewards</th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {Object.entries(threeMonthData).map((el, index) => {
                return (
                  <tr key={index}>
                    {" "}
                    <td>{el[0]}</td> <td>{el[1].rewardPoints}</td>{" "}
                  </tr>
                );
              })}
              <tr>
                {" "}
                <td>Total Reward</td>{" "}
                <td>
                  {" "}
                  {Object.entries(threeMonthData).reduce(
                    (acc, el) => acc + el[1].rewardPoints,
                    0
                  )}
                </td>{" "}
              </tr>{" "}
            </tbody>{" "}
          </table>{" "}
          <h4>User Transactions</h4>{" "}
          {userTransactions.length > 0 ? (
            <table className="customers">
              {" "}
              <thead>
                {" "}
                <tr>
                  {" "}
                  <th>Date</th> <th>Amount</th> <th>Rewards</th>{" "}
                </tr>{" "}
              </thead>{" "}
              <tbody>
                {" "}
                {userTransactions.map((item, index) => {
                  return (
                    <tr key={index}>
                      {" "}
                      <td>{item["date"]}</td> <td>{item["amount"]}</td>{" "}
                      <td>{calculateRewardPoints(item["amount"])}</td>{" "}
                    </tr>
                  );
                })}
              </tbody>{" "}
            </table>
          ) : (
            <div>No Transactions Found</div>
          )}
        </>
      )}
    </>
  );
}
export default RewardPoints;
