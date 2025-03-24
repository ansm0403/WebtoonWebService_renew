import React, { ReactNode } from 'react'

export default function ToggleButton({
    toggled,
    onToggle,
    toggleIcon,
    unToggleIcon
} : {
    toggled : boolean,
    onToggle : (toggled : boolean) => void
    toggleIcon : ReactNode
    unToggleIcon : ReactNode
}) {
  return (
    <button onClick={() => onToggle(!toggled)}>
        { toggled ? toggleIcon : unToggleIcon }
    </button>
  )
}
