import React from 'react'

function SidebarRowComponent(props) {

    return (
        //Class name of selected sidebarRow is: sidebarRow selected
        //Class name of unselected sidebarRos is: sidebarRow
        <div className={`sidebarRow ${props.selected && "selected"}`}>
            <props.icon className={'sidebarRow-icon'} />
            <h2 className="sidebarRow-title">{props.title}</h2>
        </div>
    )
}

export default SidebarRowComponent