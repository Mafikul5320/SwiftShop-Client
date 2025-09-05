import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AllUser = () => {
    const axiosSecure = useAxiosSecure();
    const quaryclient = useQueryClient()

    const { data: AllUser = [] } = useQuery({
        queryKey: ["AllUser"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        }
    });

    const adminMake = useMutation({
        mutationKey: ["AllUser"],
        mutationFn: async (id) => {
            const res = await axiosSecure.patch(`/make-admin?id=${id}`)
            console.log(res.data)
            return res.data;
        },
        onSuccess: () => {
            quaryclient.invalidateQueries(["AllUser"])
        }
    })

    const handelMakeAdmin = (id) => {
        adminMake.mutate(id)
    }

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl font-semibold text-gray-800">All Users</h1>
                <button className="border rounded-md px-3 py-1 text-sm text-gray-700">
                    Total: {AllUser.length} users
                </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto bg-white rounded-lg shadow">
                <table className="table-auto w-full border-collapse">
                    <thead className="bg-gray-50 text-gray-600 text-sm uppercase tracking-wide">
                        <tr>
                            <th className="text-left px-6 py-3">User</th>
                            <th className="text-left px-6 py-3">Email</th>
                            <th className="text-left px-6 py-3">Role</th>
                            <th className="text-left px-6 py-3">Status</th>
                            <th className="text-left px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm text-gray-700">
                        {AllUser.map((oneUser) => {
                            const isAdmin = oneUser?.role === "Admin";

                            return (
                                <tr
                                    key={oneUser?._id}
                                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                                >
                                    {/* Avatar */}
                                    <td className="px-6 py-4">
                                        {oneUser?.profile_img ? (
                                            <img
                                                src={oneUser.profile_img}
                                                alt="avatar"
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                                                {oneUser?.email?.[0]?.toUpperCase()}
                                            </div>
                                        )}
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-4">{oneUser?.email}</td>

                                    {/* Role Badge */}
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full
                      ${isAdmin
                                                    ? "bg-purple-100 text-purple-600"
                                                    : "bg-gray-100 text-gray-600"
                                                }`}
                                        >
                                            {oneUser?.role}
                                        </span>
                                    </td>

                                    {/* Status */}
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full">
                                            Active
                                        </span>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-6 py-4">
                                        {isAdmin ? (
                                            <span className="text-gray-400 text-sm">Already Admin</span>
                                        ) : (
                                            <button onClick={() => handelMakeAdmin(oneUser?._id)} className="px-4 py-1 text-sm text-white bg-blue-600 rounded hover:bg-blue-700 transition">
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
