
import React, { useState, useEffect, useCallback } from "react";
import './ColorPopup.css'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import {FaRegCopy, FaList,FaEllipsisV, FaShareAlt} from 'react-icons/fa'
import {RiSendPlaneFill, RiDeleteBin6Line} from 'react-icons/ri'


const COLORS = {
  white: "white",
  green: "green",
  red: "red",
  blue: "blue",
  yellow: "yellow",
  orange: "orange",
  pink: "pink",
  purple: "purple"
};

const ColorPopup = () => {

  const copyCoupon = (e, data) => {
    var coupon = data.copy
    navigator.clipboard.writeText(coupon)
    alert(`Coupon code ${coupon} copied to your clipboard`)
  }

  const [activeColor, setActiveColor] = useState(COLORS.green);

  return (
    <div>
    
 
      <ContextMenu id="contextmenu">
      <legend>
            Color: <CellButton color={activeColor} />
          </legend>
          {Object.entries(COLORS).map(([key, value]) => (
            <CellButton
              key={key}
              title={`Select color: ${key}`}
              color={value}
              onClick={() => setActiveColor(value)}
            />
          ))}

      </ContextMenu>
    </div>
  )
}

export default ColorPopup

const CellButton = ({ color, ...otherProps }) => {
  return (
    <span style={{ backgroundColor: color }} className="cell" {...otherProps} />
  );
};