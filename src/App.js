import React, { useState,useRef, useCallback } from "react";
import ContextMenu from "@agjs/react-right-click-menu";

const COLORS = {
  white: "white",
  red: "red",
  blue: "blue",
  yellow: "yellow",
};

const GRID_ROWS = 100;
const GRID_COLUMNS = 100;


const isMouseDown = () => window.mouseDownState;

window.addEventListener("mousedown", () => {
  window.mouseDownState = true;
});
window.addEventListener("mouseup", () => {
  window.mouseDownState = false;
});


export default function App() {

  const [activeColor, setActiveColor] = useState(COLORS.red);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const ref = useRef();

  const Foo = () => <div id="contextmenu" style={{ margin: 0, padding: 0, backgroundColor: '#fff' }}>
            <div style={{ padding: 10, }}>
            <p>
              Color: <CellButton color={activeColor} />
            </p>
            {Object.entries(COLORS).map(([key, value]) => (
              <CellButton
                key={key}
                title={`Select color: ${key}`}
                color={value}
                onClick={() => setActiveColor(value)}
                id="ColorGrid"
              />
            ))}
          </div>
</div>;

  return (
    <main  >

      <ContextMenu
        trigger={ref}
        component={<Foo />}
        isOpen={isMenuShown}
        setIsOpen={setIsMenuShown}
      />


<div ref={ref} >

        {Array.from({ length: GRID_ROWS }).map((_, i) => (
          <div className="row" key={i}>
            {Array.from({ length: GRID_COLUMNS }).map((_, j) => (
              <Cell key={j} id={`${j},${i}`} activeColor={activeColor} />
            ))}
          </div>
        ))}
</div>
    </main>
  );
}

const Cell = ({
  id,
  activeColor,
  onChange = (id, c) => console.log(id, c)
}) => {
  const [color, setColor] = useState(COLORS.white);

  const handleMouseDown = useCallback(() => {
    setColor(activeColor);
    onChange(id, activeColor);
  }, [activeColor, id, onChange]);

  const handleMouseOver = useCallback(() => {
    if (isMouseDown()) {
      setColor(activeColor);
      onChange(id, activeColor);
    }
  }, [activeColor, id, onChange]);



  return (
    <CellButton
    onMouseDown={handleMouseDown}
    onMouseOver={handleMouseOver}
      color={color}
    />
  );
};

const CellButton = ({ color, ...otherProps }) => {
  return (
    <span style={{ backgroundColor: color }} className="cell" {...otherProps} />
  );
};