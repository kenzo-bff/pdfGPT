"use client";
import { DrizzleChat } from "@/lib/db/schema";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { MessageCircle, PlusCircle, Trash } from "lucide-react";
import { cn } from "@/lib/utils";
import SubscriptionButton from "./SubscriptionButton";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

type Props = {
  chats: DrizzleChat[];
  chatId: number;
  isPro: boolean;
};

const ChatSideBar = ({ chats, chatId, isPro }: Props) => {
  const [chatList, setChatList] = React.useState(chats);
  const router = useRouter();

  const handleDeleteClick = async () => {
    await axios.post("/api/delete-chat", { chatId });
    router.push("/");
    setChatList((prevChats) => prevChats.filter((chat) => chat.id !== chatId));
    toast.success("Chat deleted!");
  };

  return (
    <div className="w-full h-screen p-4 text-gray-200 bg-gray-900">
      <Link href="/">
        <Button className="w-full border-dashed border-white border">
          <PlusCircle className="mr-3 h-4 w-4 cursor-pointer" />
          New Chat
        </Button>
      </Link>

      <div className="flex flex-col gap-2 mt-5">
        {chatList.map((chat) => (
          <Link key={chat.id} href={`/chat/${chat.id}`}>
            <div
              className={cn("rounded-lg p-3 text-slate-300 flex items-center", {
                "bg-blue-600 text-white": chat.id === chatId,
                "hover:text-white hover:bg-blue-600": chat.id !== chatId,
              })}
            >
              <MessageCircle className="mr-2" />
              <p className="w-full overflow-hidden mr-2 text-sm truncate whitespace-nowrap text-ellipsis">
                {chat.pdfName}
              </p>
              {chat.id === chatId && (
                <button onClick={handleDeleteClick}>
                  <Trash className="w-5 h-5 text-black-500" />
                </button>
              )}
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-4 left-4">
        <div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
          <Link href="/">
            <div>
              <Button className="border-2 my-2">Home</Button>
            </div>
          </Link>
        </div>
        <div className="">
          <SubscriptionButton isPro={isPro} />
        </div>
      </div>
    </div>
  );
};

export default ChatSideBar;
