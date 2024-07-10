import React, { useEffect, useState } from 'react';
import { SlCallIn, SlCallOut } from "react-icons/sl";
import { IoArchiveOutline } from "react-icons/io5";
import { HiOutlinePhoneMissedCall } from "react-icons/hi";
import { RiInboxUnarchiveLine } from "react-icons/ri";

const Card = ({ callDetails, archiveCall }) => {

    return (
        <div className='card-wrapper'>
            <div className='card-container'>
                {
                    callDetails.direction === "inbound" ? <SlCallIn />
                        : callDetails.direction === "outbound" ? <SlCallOut /> : <HiOutlinePhoneMissedCall />

                }
                <p>
                    <span>
                        +33 687 2344
                    </span>
                    <span>
                        duration:{callDetails.duration}s
                    </span>
                </p>
                <span>
                    {new Date(callDetails.created_at).toLocaleTimeString('en-US')}
                </span>
            </div>
            <div className='card-btn' style={callDetails.is_archived ? { background: "#2ac520" } : { background: "red" }} onClick={() => archiveCall(callDetails.id, callDetails.is_archived)}>
                {
                    callDetails.is_archived && <RiInboxUnarchiveLine />

                }
                {
                    !callDetails.is_archived && <IoArchiveOutline />
                }
            </div>
        </div>
    );
};

export default Card;