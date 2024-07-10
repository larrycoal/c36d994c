import React from 'react';
import { FaClock } from "react-icons/fa";
import { IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { IoMdKeypad } from "react-icons/io";
import { FaVoicemail } from "react-icons/fa";
import { IoArchive } from "react-icons/io5";
import {Archived_Page, Recent_Page} from "./constant"

const Footer = ({ archiveCount, page, changePage}) => {
    return (
        <footer className='footer-wrapper'>
            <FaClock className='recent' onClick={() => { changePage(Recent_Page)}} style={page === Recent_Page ?{fill:"black"}:{fill:"gray"}} />
            <IoPersonCircle />
            <IoMdKeypad className='keypad' />
            <div className='archive-wrapper' onClick={() => { changePage(Archived_Page)}}>
            <span className='archive-count'>{archiveCount?.length}</span>
                <IoArchive style={page === Archived_Page ? { fill: "black" } : { fill: "gray" }} />
            </div>
            <FaVoicemail />
        </footer>
    );
};

export default Footer;