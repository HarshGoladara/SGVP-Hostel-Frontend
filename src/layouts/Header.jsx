import React from "react";
import { NavLink } from 'react-router-dom';

export default function Header() {
    return (
        <>
            {/* <ul className="flex justify-center py-2 px-10">
                <div className="min-w-40 bg-blue-200 h-10 flex justify-center bg-opacity-30 flex-col rounded-s-3xl hover:bg-transparent transition duration-500">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 text-center
                                        ${isActive ? "font-extrabold" : "text-gray-700"} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        GatePass Form
                    </NavLink>
                </div>
                <div className="min-w-40 bg-blue-200 h-10 flex justify-center bg-opacity-30 flex-col rounded-e-3xl hover:bg-transparent transition duration-500">
                    <NavLink
                        to="/gatepassList"
                        className={({ isActive }) =>
                            `block py-2 pr-4 pl-3 duration-200 border-b border-gray-100 text-center
                                        ${isActive ? "font-extrabold" : "text-gray-700"} lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                        }
                    >
                        GatePass Records
                    </NavLink>
                </div>
            </ul> */}
        </>
    );
};