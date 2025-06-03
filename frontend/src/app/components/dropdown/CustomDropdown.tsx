'use client';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const DefaultOpts = [{ id: 8, name: 8 }, { id: 10, name: 10 }, { id: 20, name: 20 }, { id: 40, name: 40 }];

export default function CustomDropdown({ DefaultVal = 0, Opts = DefaultOpts }) {
    const refDropdown = useRef<HTMLDivElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);
    const [selectOpt, setSelectOpt] = useState(DefaultVal);
    const [open, setOpen] = useState(false);
    const [dropdownStyle, setDropdownStyle] = useState({ top: 0, left: 0, width: 0 });

    const updateDropdownPosition = () => {
        const btn = btnRef.current;
        if (btn) {
            const rect = btn.getBoundingClientRect();
            setDropdownStyle({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width
            });
        }
    }

    const getSugBar = () => {
        if (!refDropdown.current) return { check: false, dpd: null };
        const dpd = refDropdown.current.querySelector('.customStyleDropdown');
        const check = dpd?.classList.contains('hidden');
        return { check, dpd };
    }

    // const onOpen = () => {
    //     const { check, dpd } = getSugBar();
    //     if (check) dpd?.classList.remove('hidden');
    //     else dpd?.classList.add('hidden');
    // };
    useEffect(() => {
        if (open) updateDropdownPosition();
    }, [open]);

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (refDropdown?.current && !refDropdown.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        // const outsideClick = (e: MouseEvent) => {
        //     if (refDropdown?.current && !refDropdown.current.contains(e.target as Node)) {
        //         const { check, dpd } = getSugBar();
        //         if (!check) dpd?.classList.add('hidden');
        //     }
        // }
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);
    const onSelect = (opt: number = 0) => {
        setSelectOpt(opt);
        const { check, dpd } = getSugBar();
        if (!check) dpd?.classList.add('hidden');
    }
    return (
        <>
            <div className="relative  h-[3.375rem] rounded-[0.46rem]">
                <button
                    ref={btnRef}
                    type='button'
                    onClick={() => setOpen(!open)}
                    className="capitalize w-full text-left px-[.96rem] py-1
                flex items-center justify-between text-[1.187rem] h-full">
                    <span className="">{selectOpt}</span>
                    <Image src="icons/down.svg" width={24} height={24} alt="down arrow" />
                </button>
            </div>
            {open && createPortal(
                <div
                    className={`z-[1000] absolute flex flex-col  bg-white w-full text-sm text-center shadow-md rounded-b-md `}
                    style={{
                        position: 'absolute',
                        top: dropdownStyle.top,
                        left: dropdownStyle.left,
                        width: dropdownStyle.width
                    }}
                >
                    {Opts.map((d, i) => (
                        <button
                            key={i}
                            type='button'
                            className=" px-2 py-1 hover:bg-secondary hover:text-txtPrimary rounded-sm whitespace-nowrap text-center text-gray hover:text-black"
                            onClick={() => onSelect(d.name)}>
                            {d.name}
                        </button>
                    ))}
                </div>, document.body
            )}


        </>
    )
}
