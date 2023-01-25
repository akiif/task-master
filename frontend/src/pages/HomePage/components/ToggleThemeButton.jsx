import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import "../../../assets/css/theme-switch.css";

// import Material UI components
import Tooltip from '@mui/material/Tooltip';

// import contexts 
import { useTheme } from '../../../contexts/ThemeProvider';

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  const handleOnClick = () => {
    toggleTheme();
  }

  return (
    <Tooltip title="Toggle Theme" placement="bottom" arrow>
      <label className="switch theme-switch">
        <input
          className='switch-input'
          type="checkbox"
          checked={theme === "light" ? true : false}
          onClick={handleOnClick}
          onChange={() => {}}
        />
        <span className="slider" />
      </label>
    </Tooltip>
  );
}

export default ToggleThemeButton;