'use client';
import ReactPaginate from "react-paginate";
export function CustomPagination({ pageRangeDisplayed = 3, totalCount = 10, onPageChange = () => { } }) {

    return (
        <div className="relative z-10 flex items-center justify-between text-[14px] font-medium  bg-bgPagination">

            <ReactPaginate
                pageCount={totalCount}
                pageRangeDisplayed={pageRangeDisplayed}
                onPageChange={onPageChange}
                renderOnZeroPageCount={null}
                previousLabel={null}
                nextLabel={null}
                breakLabel="..."
                breakClassName="w-[2.5rem] h-[2.5rem] flex items-center justify-center"
                breakLinkClassName="text-center pb-2"
                containerClassName="flex items-center justify-center gap-2"
                pageClassName="w-[2.5rem] h-[2.5rem] flex items-center justify-center "
                activeClassName="text-txtActive"
            />
        </div>
    )
}