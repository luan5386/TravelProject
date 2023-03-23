import React from "react";
import clsx from "clsx";
import styles from "./dashboard.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function SideNav() {
    const [currentLink, setCurrentLink] = useState("");
    useEffect(() => {
        const currentHref = window.location.href;
        const arrHref = currentHref.split("/");
        setCurrentLink("/dashboard/" + arrHref[4]);
    }, []);
    useEffect(() => {
        const itemLinks = document.getElementsByClassName("itemLink");
        const itemLinksLength = itemLinks.length;
        for (let i = 0; i < itemLinksLength; i++) {
            if (itemLinks[i].getAttribute("href") === currentLink) {
                itemLinks[i].classList.add(styles.active);
            }
        }
    });
    const { user } = useSelector((state) => ({ ...state.auth }));
    return (
        <div
            className={clsx(
                "col-xl-3 col-0 d-flex flex-column flex-shrink-0 p-3 shadow pt-4",
                styles.sidenav
            )}
            id="sidenav"
            style={{ width: "280px" }}
        >
            {/* <div
            className="col-xl-3 col-lg-3 d-flex flex-column flex-shrink-0 p-3 bg-white shadow pt-4"
            style={{ width: "280px" }}
        > */}

            <ul className="list-unstyled ps-0">
                {user?.result?.authority === "MANAGER" && (
                    <>
                        <li className="mb-1">
                            <button
                                className={clsx(
                                    "btn rounded",
                                    styles.btnNormal,
                                    styles.textAlignLeft,
                                    styles.fontSizeLarge
                                )}
                                style={{ padding: "0" }}
                            >
                                <Link
                                    to="/dashboard/tourSalesMng"
                                    className={clsx(
                                        "link-dark rounded",
                                        "itemLink"
                                    )}
                                    style={{
                                        padding:
                                            "0.625rem 1.3rem 0.5rem 1.5rem",
                                        display: "block",
                                    }}
                                >
                                    Tour sales
                                </Link>
                            </button>
                        </li>
                        <li className="mb-1">
                            <button
                                className={clsx(
                                    "btn rounded",
                                    styles.btnNormal,
                                    styles.textAlignLeft,
                                    styles.fontSizeLarge
                                )}
                                style={{ padding: "0" }}
                            >
                                <Link
                                    to="/dashboard/roomSalesMng"
                                    className={clsx(
                                        "link-dark rounded",
                                        "itemLink"
                                    )}
                                    style={{
                                        padding:
                                            "0.625rem 1.3rem 0.5rem 1.5rem",
                                        display: "block",
                                    }}
                                >
                                    Room sales
                                </Link>
                            </button>
                        </li>
                    </>
                )}
                <li className="mb-1">
                    {user?.result?.authority !== "MANAGER" && (
                        <button
                            className={clsx(
                                "btn rounded collapsed",
                                styles.btnToggle,
                                styles.textAlignLeft,
                                styles.fontSizeLarge
                            )}
                            data-bs-toggle="collapse"
                            data-bs-target="#home-collapse"
                            aria-expanded="false"
                        >
                            Managenent
                        </button>
                    )}
                    <div className="collapse show" id="home-collapse">
                        <ul
                            className={clsx(
                                "list-unstyled fw-normal pb-1 small",
                                styles.btnToggleNav
                            )}
                        >
                            {user?.result?.authority === "ADMIN" && (
                                <li>
                                    <Link
                                        to="/dashboard/usermng"
                                        className={clsx(
                                            "link-dark rounded",
                                            "itemLink"
                                        )}
                                    >
                                        User
                                    </Link>
                                </li>
                            )}
                            {user?.result?.authority === "EMPLOYEE" && (
                                <>
                                    <li>
                                        <Link
                                            to="/dashboard/tourmng"
                                            className={clsx(
                                                "link-dark rounded",
                                                "itemLink"
                                            )}
                                        >
                                            Tour
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/roommng"
                                            className={clsx(
                                                "link-dark rounded",
                                                "itemLink"
                                            )}
                                        >
                                            Room
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/tourbillmng"
                                            className={clsx(
                                                "link-dark rounded",
                                                "itemLink"
                                            )}
                                        >
                                            Tour Bill
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/dashboard/roombillmng"
                                            className={clsx(
                                                "link-dark rounded",
                                                "itemLink"
                                            )}
                                        >
                                            Room Bill
                                        </Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        // </div>
    );
}

export default SideNav;
