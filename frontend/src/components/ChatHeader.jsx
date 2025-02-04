import React from 'react'
import { useChatStore } from '../store/useChatStore'
import {X} from "lucide-react"

const ChatHeader = () => {
    const {selectedUser,setSelectedUser}= useChatStore();
    

  return (
    <div className="p-2.5 border-b border-base-300">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* profile photo display */}
        <div className="avatar">
          <div className="size-10 rounded-full relative">
            <img src={selectedUser.profilepic || "/avatar.png"} alt={selectedUser.fullName} />
          </div>
        </div>
            {/* user information */}
        <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            </div>
        </div>

        {/* close chat  */}

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
}

export default ChatHeader
