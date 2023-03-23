import React from "react";
import clsx from "clsx";
import styles from "./user.module.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function UserSideNav() {
    const [currentLink, setCurrentLink] = useState("");
    useEffect(() => {
        const currentHref = window.location.href;
        const arrHref = currentHref.split("/");
        setCurrentLink("/user/" + arrHref[4]);
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
                "col-xl-3 col-lg-3 d-flex flex-column flex-shrink-0 p-3 bg-white shadow pt-4",
                styles.sidenav
            )}
            id="sidenav"
            style={{ width: "280px" }}
        >
            <ul className="list-unstyled ps-0">
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
                            to="/user/information"
                            className={clsx("link-dark rounded", "itemLink")}
                            style={{
                                padding: "0.625rem 1.3rem 0.5rem 1.5rem",
                                display: "block",
                            }}
                        >
                            Hồ sơ của tôi
                        </Link>
                    </button>
                </li>
                <li className="mb-1">
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
                        Đơn đã đặt
                    </button>
                    <div className="collapse show" id="home-collapse">
                        <ul
                            className={clsx(
                                "list-unstyled fw-normal pb-1 small",
                                styles.btnToggleNav
                            )}
                        >
                            <li>
                                <Link
                                    to="/user/tourBills"
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
                                    to="/user/roomBills"
                                    className={clsx(
                                        "link-dark rounded",
                                        "itemLink"
                                    )}
                                >
                                    Phòng
                                </Link>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </div>
        // </div>
    );
}

export default UserSideNav;
