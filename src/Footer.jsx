import React from 'react';
import { FaClock } from "react-icons/fa";
import { IoPersonCircle, IoSettingsSharp } from "react-icons/io5";
import { IoMdKeypad } from "react-icons/io";
import { FaVoicemail } from "react-icons/fa";
import { IoArchive } from "react-icons/io5";
import { Archived_Page, Recent_Page, Voicemail_Page } from "./constant"

const Footer = ({ archiveCount, page, changePage }) => {
    return (
        <footer className='footer-wrapper'>
            <div className='footer-item'>
                <FaClock className='recent' onClick={() => { changePage(Recent_Page) }} style={page === Recent_Page ? { fill: "black" } : { fill: "gray" }} />
                <span>Recent</span>
            </div>
            <div className='footer-item'>
                <IoPersonCircle />
                <span>Contacts</span>
            </div>
            <div className='footer-item'>
                <IoMdKeypad className='keypad' />
                <span>Keypad</span>
            </div>
            <div className='archive-wrapper' onClick={() => { changePage(Archived_Page) }}>
                <span className='archive-count'>{archiveCount?.length}</span>
                <IoArchive style={page === Archived_Page ? { fill: "black" } : { fill: "gray" }} />
                <span>Archive</span>
            </div>
            <div className='footer-item voicemail-icon' onClick={() => { changePage(Voicemail_Page) }} >
                <FaVoicemail style={page === Voicemail_Page ? { fill: "black" } : { fill: "gray" }} />
                <span>Voicemail</span>
            </div>
        </footer>
    );
};

export default Footer;