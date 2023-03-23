import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./SideNav";
import { getUsers, deleteUser } from "../../redux/features/authSlice";
import Spinner from "../common/Spinner";
import {toast} from "react-toastify"

function UserMng() {
    const { users, loading } = useSelector((state) => ({
        ...state.auth,
    }));
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUsers());
    }, []);

    if (loading) {
        return <Spinner />;
    }

    const handleDelete = (id) => {
        if(window.confirm("Are you sure you want to delete this user?")){
            dispatch(deleteUser({id, toast}))
        }
    }
    return (
        <div className="container m-5">
            <div className="row g-5">
                <SideNav />

                <div className="col-xl-9 shadow">
                    <h1 className="text-center pt-5">USER MANAGEMENT</h1>
                    <button className="btn my-3" style={{float: "left"}}>
                        <Link to="/addUser">
                            Add user
                        </Link>
                    </button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Username</th>
                                <th scope="col">Name</th>
                                <th scope="col">Authority</th>
                                {/* <th scope="col">CreatedAt</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.username}</td>
                                    <td>{user.name}</td>
                                    <td>{user.authority}</td>
                                    <td>
                                        <Link to={`/editUser/${user._id}`}>
                                            <i
                                                className="fas fa-edit mb-4"
                                                style={{
                                                    fontSize: "1.4rem",
                                                    cursor: "pointer",
                                                }}
                                            ></i>
                                        </Link>
                                        <a
                                            href=""
                                            style={{
                                                color: "red",
                                                marginLeft: "16px",
                                            }}
                                        >
                                            <i
                                                className="fas fa-trash-alt"
                                                style={{
                                                    fontSize: "1.4rem",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    handleDelete(user._id)
                                                }
                                            ></i>
                                        </a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UserMng;
