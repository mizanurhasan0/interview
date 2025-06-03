'use client';
import Image from 'next/image'
import React, { useState } from 'react'
import CustomCheckbox from '../checkboxs/CustomCheckBox'
import CustomDropdown from '../dropdown/CustomDropdown'
import CustomModal from '../modal/CustomModal';
import { CustomPagination } from '../paginate/CustomPagination';
import { useUsers } from '@/app/context/UserContext';

type tableTypes = {
    headers: string
}
type HeadersListType = {
    [key: string]: string[]
}
type User = {
    users: Array<{
        id: number;
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
    }>
    meta?: {
        total: number;
        page: number;
        perPage: number;
        pages: number
    };
};
type UseUsersReturnType = {
    user: {
        users: User['users'];
        meta?: User['meta'];
    }
    loading: boolean;
};
const HeadersList: HeadersListType = {
    header1: ["Id", "First Name", "Last Name", "Email", "Phone"],
}
const initialState: UseUsersReturnType = {
    user: {
        users: [],
        meta: { page: 0, pages: 0, perPage: 0, total: 0 }
    },
    loading: true
};
const hiddenIcon = ['Phone'];
export default function CustomTbl({ headers = 'header1' }: tableTypes) {
    const [showDetails, setShowDetails] = useState<string | number>('');
    const { loading, user: { users, meta } }: UseUsersReturnType = useUsers() ?? initialState;
    const [checkBoxSelect, setCheckBoxSelect] = useState<number[]>([]);

    const onCheckBoxClick = (id: number) => {
        if (checkBoxSelect.includes(id)) {
            setCheckBoxSelect(checkBoxSelect.filter(item => item !== id));
        } else {
            setCheckBoxSelect([...checkBoxSelect, id]);
        }
    }
    const onSelectAll = () => {
        if (checkBoxSelect.length === users.length) {
            setCheckBoxSelect([]);
        } else {
            const allIds = users.map(user => user.id);
            setCheckBoxSelect(allIds);
        }
    }

    console.log(checkBoxSelect);
    // const userContext = useUsers();
    if (loading) return <div className="text-white animate-ping">Loading...</div>
    if (users.length === 0) return <div className="text-white">No data found</div>
    return (
        <div className="relative bg-white rounded-xl  shadow-lg overflow-hidden">
            <div className="absolute bg-[url('/background.jpg')] bg-cover inset-0 z-0 opacity-5"></div>
            {/* Scrollable table wrapper */}
            <div className="relative overflow-x-auto z-10">
                <table className="w-full text-sm text-left">
                    <thead className="h-14 bg-tblHeader text-tblHeaderText">
                        <tr>
                            <th className="pl-10 py-2 whitespace-nowrap">
                                <div>
                                    <CustomCheckbox onCheck={onSelectAll} checked={checkBoxSelect.length === users.length} />
                                </div>
                            </th>
                            {
                                HeadersList[headers].map((header, index) => (
                                    <th key={index} className="px-4 py-2 whitespace-nowrap ">
                                        <p className="flex items-center justify-center gap-4">
                                            <span>
                                                {header}
                                            </span>
                                            {hiddenIcon.includes(header) ? '' : <Image src="icons/down.svg" width={24} height={24} alt="down arrow" />}
                                        </p>
                                    </th>
                                ))
                            }

                        </tr>
                    </thead>
                    <tbody className="text-center ">
                        {users && users.map((item, idx) => (
                            <tr key={idx} className="h-[3.375rem] relative cursor-pointer" onClick={() => setShowDetails((prev) => prev === item.id ? '' : item.id)}>
                                <td>
                                    <div className="pl-10">
                                        <CustomCheckbox onCheck={() => onCheckBoxClick(item?.id)} checked={checkBoxSelect.includes(item.id)} />
                                    </div>
                                </td>
                                <td>
                                    <div className="pr-2">
                                        {item?.id || 0}
                                    </div>
                                </td>
                                <td>{item?.first_name}</td>
                                <td>{item?.last_name}</td>
                                <td className="truncate">{item?.email}</td>
                                <td className="pr-10 px-10">{item?.phone || "0193852"}</td>
                                <td className="absolute left-0 right-0 top-10 px-5 ">
                                    {showDetails === item.id ? (
                                        <div>
                                            <CustomModal />
                                        </div>
                                    ) : ''}
                                </td>

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
            {/* Pagination section */}
            <div className="flex itemcenter justify-between px-5 bg-bgPagination z-10 relative">
                <div className="flex items-center justify-between ">
                    <p className="text-[0.875rem] text-txtSecondary">Rows per page </p>
                    <CustomDropdown DefaultVal={(Number(meta?.pages)) || 10} />
                </div>
                <CustomPagination totalCount={meta?.total && Math.round(Number(meta?.total / meta?.pages)) || 0} />
                <div className="flex items-center justify-center text-[0.875rem] text-txtSecondary space-x-2">
                    <p>Go to page</p>
                    <input
                        type="number"
                        className="w-[3.125rem] h-[2.5rem] text-center border-b"
                        defaultValue={1}
                    />
                    <Image src="icons/arrow2.svg" width={24} height={24} alt="down arrow" />
                </div>
            </div>
        </div>
    )
}
