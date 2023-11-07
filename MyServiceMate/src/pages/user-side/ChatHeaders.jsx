import React from "react";
import { server } from "../../server";


export const ChatHeader = (props) => {
    const { name ,image} = props;


    console.log(image, 'head');
    // Static data for the chat header
    const chatInfo = {
        username: "John Doe",
        lastSeen: "Online", // You can replace this with a dynamic last seen status
        profilePicUrl: "https://example.com/profile-pic.jpg", // Replace with the actual profile picture URL
    };

    return (
        <div className="bg-white p-4 border-b">
            <div className="flex items-center">
                <img
                    className="w-12 h-12 rounded-full mr-4"
                    src={`${server}${image}`} 
                    alt={`${name}'s Profile`}
                />
                <div>
                    <p className="text-xl font-semibold">{name}</p>
                    <p className="text-sm text-gray-500">recently active</p>
                </div>
            </div>
        </div>
    );
};