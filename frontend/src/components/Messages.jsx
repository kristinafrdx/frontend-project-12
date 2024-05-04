import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const Messages = ({ username, message}) => {

  return (
    <div className="text-break mb-2">
      <b>{ username }</b>
      : {'\u00A0'}{ message }
    </div>
  )
}

export default Messages;