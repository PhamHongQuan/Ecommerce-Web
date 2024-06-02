import {useSelector} from "react-redux";
import React from "react";

export function AccountInfo() {
    const user = useSelector(state => state.currentUser);
    return ( <p className="ms-2">{user.username})</p>);
}