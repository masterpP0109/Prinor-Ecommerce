import React from "react";
import { Chat as ChatType } from "@/types/chat";
import Image from "next/image";
import Link from "next/link";

interface ChatCardProps {
  chat: ChatType;
}

const ChatCard: React.FC<ChatCardProps> = ({ chat }) => {
  return (
    <Link href={`/chat/${chat.name}`} className="flex items-center p-4 hover:bg-gray-100">
      <Image src={chat.avatar} alt={chat.name} width={40} height={40} className="rounded-full" />
      <div className="ml-3">
        <h4 className="font-semibold">{chat.name}</h4>
        <p className="text-sm text-gray-600">{chat.text}</p>
      </div>
      <span className="ml-auto text-sm text-gray-400">{new Date(chat.time).toLocaleTimeString()}</span>
      {chat.dot > 0 && (
        <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-500"></span>
      )}
    </Link>
  );
};

export default ChatCard;