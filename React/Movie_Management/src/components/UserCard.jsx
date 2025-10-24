import React from 'react';

const UserCard = (user) => {

    return (
        <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Profile</h5>

            </div>
            <div className="flow-root">
                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center">

                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Username:
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.username}
                                </p>
                            </div>
                        </div>
                    </li>
                    <li className="py-3 sm:py-4">
                        <div className="flex items-center">

                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Email:
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </li><li className="py-3 sm:py-4">
                        <div className="flex items-center">

                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Phone:
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.phone}
                                </p>
                            </div>
                        </div>
                    </li><li className="py-3 sm:py-4">
                        <div className="flex items-center">

                            <div className="flex-1 min-w-0 ms-4">
                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                    Password:
                                </p>
                                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                                    {user.password}
                                </p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default UserCard;
