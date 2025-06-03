import React from 'react'

const modalHeader = ["Address 01", "Address 02", "Phone"];

export default function CustomModal() {
    return (
        <div className="z-20 relative absolute w-full shadow-lg rounded-[10px] overflow-hidden">
            <table className='h-full w-full'>
                <thead className="h-[3.375rem] bg-tblHeader text-tblHeaderText">
                    <tr>
                        {
                            modalHeader.map((header, index) => (
                                <th key={index} className="pr-5 ">
                                    <p className="text-[0.875rem] font-normal flex items-center justify-center">
                                        {header}
                                    </p>
                                </th>
                            ))
                        }

                    </tr>
                </thead>
                <tbody className="">
                    <tr className="h-[3.375rem] bg-white text-center">
                        <td>779 Bluejay Road</td>
                        <td>Room 1495</td>
                        <td className="pr-5">604-848-8765</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
