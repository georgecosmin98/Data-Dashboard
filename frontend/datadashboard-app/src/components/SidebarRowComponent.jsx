import React from 'react'

function SidebarRowComponent(props) {

    return (
        <div className={`sidebarRow ${props.selected && "selected"}`}>
            <props.icon className={'sidebarRow-icon'} />
            <h2 className="sidebarRow-title">{props.title}</h2>
        </div>
    )
}

export default SidebarRowComponent