import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { getStatus, getUsername } from "../../redux/selector/app";
import { getShowNotification } from "../../redux/selector/home";
import { disableUser } from "../../redux/actions/app";
import { enableNotification } from "../../redux/actions/home";

function Home() {
  const dispatch = useDispatch()
  const username = useSelector(getUsername)
  const status = useSelector(getStatus)
  const showNotification = useSelector(getShowNotification)
  console.log(username, status, showNotification)
  useEffect(() => {
    dispatch(disableUser())
    dispatch(enableNotification())
    setTimeout(() => {
      console.log(username, status, showNotification)
    })
  })
  return <div onClick={() => console.log("Hello")}>
    Home works
    <Link to="/list">jump to list</Link>
  </div>;
}

export default Home;
