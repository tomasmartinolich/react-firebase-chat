import { useState, useEffect } from "react"
import "./chatList.css"
import AddUser from "./addUser/addUser"
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

export default function ChatList() {
    const [addMode, setAddMode] = useState(false)
    const [chats, setChats] = useState([])
    const {currentUser} = useUserStore();

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "userchats", currentUser.id), async(res) => {
            const items = res.data().chats;

            const promises = items.map(async (item)=>{
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);

                const user = userDocSnap.data();

                return {...item, user};
            });

            const chatData = await Promise.all(promises);

            setChats(chatData.sort((a,b)=>b.updatedAt - a.updatedAt));
        });

        return ()=>{
            unsub();
        }
    }, [currentUser.id])
    

    useEffect(() => {
        document.addEventListener("keydown", (e) =>{
            if(e.key === 'Escape') setAddMode(false);
        })
    }, [])

    return(
        <div className='chatList'>
            <div className="search">
                <div className="searchBar">
                    <img src="/search.png" alt="" />
                    <input type="text" placeholder="Search" />
                </div>
                <img 
                src={addMode ? "./minus.png" : "./plus.png"} 
                alt="" 
                className="add" 
                onClick={()=> setAddMode((prev) => !prev)} />
            </div>
            {chats.map((chat)=>{
                <div className="item" key={chat.chatId}>
                    <img src={chat.user.avatar || "./avatar.png"} alt="" />
                    <div className="texts">
                        <span>{chat.user.username}</span>
                        <p>{chat.lastMessage}</p>
                    </div>
                </div>
            })}
            {addMode && <AddUser />}
        </div>
    )
}