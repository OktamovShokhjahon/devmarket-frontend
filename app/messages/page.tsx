"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/auth-context";
import { formatDistanceToNow } from "date-fns";
import {
  PlaneIcon as PaperPlaneIcon,
  Search,
  SmileIcon,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// Mock conversations data
const mockConversations = [
  {
    id: "1",
    user: {
      id: "u1",
      name: "Jane Seller",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "seller",
      isOnline: true,
      lastActive: new Date().toISOString(),
    },
    lastMessage: {
      text: "I can deliver the custom dashboard by Friday. Does that work for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "2",
    user: {
      id: "u2",
      name: "John Developer",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "seller",
      isOnline: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    lastMessage: {
      text: "Thanks for your order! I'll start working on it right away.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
      isRead: false,
    },
    unreadCount: 1,
  },
  {
    id: "3",
    user: {
      id: "u3",
      name: "Design Studio",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "seller",
      isOnline: true,
      lastActive: new Date().toISOString(),
    },
    lastMessage: {
      text: "I've sent you the revised logo designs. Let me know what you think!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "4",
    user: {
      id: "u4",
      name: "React Masters",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "seller",
      isOnline: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    },
    lastMessage: {
      text: "The component library is ready for review. You can check it out in the shared repository.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
      isRead: true,
    },
    unreadCount: 0,
  },
  {
    id: "5",
    user: {
      id: "u5",
      name: "Security Pro",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "seller",
      isOnline: false,
      lastActive: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    lastMessage: {
      text: "I've implemented the two-factor authentication as requested. Here's how to test it.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
      isRead: false,
    },
    unreadCount: 2,
  },
];

// Mock messages for each conversation
const mockMessages = {
  "1": [
    {
      id: "m1-1",
      senderId: "u1",
      text: "Hi there! I saw you purchased my Modern Dashboard UI Kit.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    },
    {
      id: "m1-2",
      senderId: "current-user",
      text: "Yes, I did! I'm looking to customize it for my project. Would you be available for some custom work?",
      timestamp: new Date(Date.now() - 1000 * 60 * 55).toISOString(), // 55 minutes ago
    },
    {
      id: "m1-3",
      senderId: "u1",
      text: "I'd be happy to help. What kind of customizations are you looking for?",
      timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(), // 50 minutes ago
    },
    {
      id: "m1-4",
      senderId: "current-user",
      text: "I need a custom dashboard with specific metrics for my SaaS application. Can you create additional widgets?",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    },
    {
      id: "m1-5",
      senderId: "u1",
      text: "Yes, I can definitely do that. Could you share more details about the metrics you want to display?",
      timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(), // 40 minutes ago
    },
    {
      id: "m1-6",
      senderId: "current-user",
      text: "I need user acquisition, retention, and revenue metrics. I'll send you a mockup of what I'm thinking.",
      timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(), // 35 minutes ago
    },
    {
      id: "m1-7",
      senderId: "u1",
      text: "That sounds good. What's your timeline for this project?",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
    {
      id: "m1-8",
      senderId: "current-user",
      text: "I'm hoping to have it ready by next week. Is that feasible?",
      timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), // 25 minutes ago
    },
    {
      id: "m1-9",
      senderId: "u1",
      text: "I can deliver the custom dashboard by Friday. Does that work for you?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
    },
  ],
  "2": [
    {
      id: "m2-1",
      senderId: "u2",
      text: "Hello! Thank you for purchasing my E-commerce Template.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: "m2-2",
      senderId: "current-user",
      text: "Hi John! I'm excited to use it for my new online store.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1.5).toISOString(), // 1.5 hours ago
    },
    {
      id: "m2-3",
      senderId: "u2",
      text: "Great! Let me know if you need any help setting it up.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 1).toISOString(), // 1 hour ago
    },
    {
      id: "m2-4",
      senderId: "current-user",
      text: "Actually, I do have a question. How do I integrate it with my payment processor?",
      timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
    },
    {
      id: "m2-5",
      senderId: "u2",
      text: "Thanks for your order! I'll start working on it right away.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    },
  ],
  "3": [
    {
      id: "m3-1",
      senderId: "u3",
      text: "Hi there! I received your request for a logo design.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    },
    {
      id: "m3-2",
      senderId: "current-user",
      text: "Yes, I'm looking for a modern logo for my tech startup.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.8).toISOString(), // 4.8 hours ago
    },
    {
      id: "m3-3",
      senderId: "u3",
      text: "Could you tell me more about your company and the style you're looking for?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4.5).toISOString(), // 4.5 hours ago
    },
    {
      id: "m3-4",
      senderId: "current-user",
      text: "We're a SaaS company focused on AI solutions. I'm looking for something minimalist but memorable.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    },
    {
      id: "m3-5",
      senderId: "u3",
      text: "Got it. I'll work on some concepts and get back to you soon.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3.5).toISOString(), // 3.5 hours ago
    },
    {
      id: "m3-6",
      senderId: "u3",
      text: "I've sent you the revised logo designs. Let me know what you think!",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
  ],
  "4": [
    {
      id: "m4-1",
      senderId: "u4",
      text: "Hello! I see you're interested in our React Component Library.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    },
    {
      id: "m4-2",
      senderId: "current-user",
      text: "Yes, I'm working on a large-scale React application and need a robust component library.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(), // 23 hours ago
    },
    {
      id: "m4-3",
      senderId: "u4",
      text: "Our library includes over 50 components with TypeScript support. Would you like me to customize any components for your specific needs?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(), // 22 hours ago
    },
    {
      id: "m4-4",
      senderId: "current-user",
      text: "That sounds great. Yes, I would need some custom data visualization components.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(), // 20 hours ago
    },
    {
      id: "m4-5",
      senderId: "u4",
      text: "I'll get started on those right away. I'll share a repository with you where you can track progress.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    },
    {
      id: "m4-6",
      senderId: "u4",
      text: "The component library is ready for review. You can check it out in the shared repository.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
    },
  ],
  "5": [
    {
      id: "m5-1",
      senderId: "u5",
      text: "Hi there! Thanks for purchasing our Authentication System.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(), // 36 hours ago
    },
    {
      id: "m5-2",
      senderId: "current-user",
      text: "Hello! I'm excited to implement it in my application.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 35).toISOString(), // 35 hours ago
    },
    {
      id: "m5-3",
      senderId: "u5",
      text: "Great! Let me know if you need any help with the integration.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 34).toISOString(), // 34 hours ago
    },
    {
      id: "m5-4",
      senderId: "current-user",
      text: "Actually, I was wondering if you could add two-factor authentication to the system?",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(), // 30 hours ago
    },
    {
      id: "m5-5",
      senderId: "u5",
      text: "Yes, I can definitely add that feature. I'll get started on it right away.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 28).toISOString(), // 28 hours ago
    },
    {
      id: "m5-6",
      senderId: "u5",
      text: "I've implemented the two-factor authentication as requested. Here's how to test it.",
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 24 hours ago
    },
  ],
};

export default function MessagesPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState(mockConversations);
  const [activeConversation, setActiveConversation] = useState<string | null>(
    null
  );
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const userLocalStorage = localStorage.getItem("user");

    if (!user && !userLocalStorage) {
      router.push("/auth/login");
    }
  }, [user, router]);

  useEffect(() => {
    if (activeConversation) {
      setMessages(
        mockMessages[activeConversation as keyof typeof mockMessages] || []
      );

      // Mark conversation as read when opened
      setConversations(
        conversations.map((conv) =>
          conv.id === activeConversation
            ? {
                ...conv,
                unreadCount: 0,
                lastMessage: { ...conv.lastMessage, isRead: true },
              }
            : conv
        )
      );
    }
  }, [activeConversation]);

  useEffect(() => {
    if (
      messagesEndRef.current &&
      messages.length > 0 &&
      messages[messages.length - 1].senderId === "current-user"
    ) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const filteredConversations = conversations.filter((conv) =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeConversation) return;

    const newMsg = {
      id: `new-${Date.now()}`,
      senderId: "current-user",
      text: newMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);

    setConversations(
      conversations.map((conv) =>
        conv.id === activeConversation
          ? {
              ...conv,
              lastMessage: {
                text: newMessage.trim(),
                timestamp: new Date().toISOString(),
                isRead: true,
              },
            }
          : conv
      )
    );

    setNewMessage("");
  };

  const handleBack = () => {
    setActiveConversation(null);
  };

  if (!user) {
    return null;
  }

  return (
    <div className="mx-auto px-4 py-4">
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="grid h-[calc(100vh-250px)] min-h-[600px] md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] 2xl:grid-cols-[350px_1fr]">
            {/* Conversations Sidebar */}
            <div
              className={`border-r h-[600px] ${
                activeConversation && isMobileView ? "hidden" : "block"
              } md:block`}
            >
              <div className="p-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Separator />
              <ScrollArea className="h-[530px]">
                {filteredConversations.length === 0 ? (
                  <div className="flex h-full items-center justify-center p-4 text-center text-muted-foreground">
                    No conversations found
                  </div>
                ) : (
                  filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`cursor-pointer border-b p-4 transition-colors hover:bg-muted/50 ${
                        activeConversation === conversation.id ? "bg-muted" : ""
                      }`}
                      onClick={() => {
                        setActiveConversation(conversation.id);
                        setIsMobileView(true);
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative flex-shrink-0">
                          <img
                            src={conversation.user.avatar || "/placeholder.svg"}
                            alt={conversation.user.name}
                            className="h-10 w-10 rounded-full"
                          />
                          {conversation.user.isOnline && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">
                              {conversation.user.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {formatDistanceToNow(
                                new Date(conversation.lastMessage.timestamp),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </div>
                          </div>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="truncate text-sm text-muted-foreground">
                              {conversation.lastMessage.text.slice(0, 20)}...
                            </div>
                            {conversation.unreadCount > 0 && (
                              <div className="ml-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                                {conversation.unreadCount}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div
              className={`h-[600px] ${
                activeConversation && isMobileView ? "block" : "hidden"
              } md:block`}
            >
              {activeConversation ? (
                <div className="flex flex-col h-full">
                  {/* Chat Header */}
                  <div className="border-b p-4 bg-background flex-none flex items-center gap-3">
                    {isMobileView && (
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={handleBack}
                        className="mr-2"
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src={
                            conversations.find(
                              (c) => c.id === activeConversation
                            )?.user.avatar || "/placeholder.svg"
                          }
                          alt="User"
                          className="h-10 w-10 rounded-full"
                        />
                        {conversations.find((c) => c.id === activeConversation)
                          ?.user.isOnline ? (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 ring-2 ring-background"></span>
                        ) : (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-yellow-500 ring-2 ring-background"></span>
                        )}
                      </div>
                      <div>
                        <div className="font-medium">
                          {
                            conversations.find(
                              (c) => c.id === activeConversation
                            )?.user.name
                          }
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {conversations.find(
                            (c) => c.id === activeConversation
                          )?.user.isOnline
                            ? "Online"
                            : `Last active ${formatDistanceToNow(
                                new Date(
                                  conversations.find(
                                    (c) => c.id === activeConversation
                                  )?.user.lastActive || new Date()
                                ),
                                { addSuffix: true }
                              )}`}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Messages - Scrollable area */}
                  <div className="flex-1 overflow-y-auto">
                    <div className="space-y-4 p-4 pb-0">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.senderId === "current-user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[80%] rounded-lg px-4 py-2 ${
                              message.senderId === "current-user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            }`}
                          >
                            <div className="text-sm break-words">
                              {message.text}
                            </div>
                            <div
                              className={`mt-1 text-xs ${
                                message.senderId === "current-user"
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {new Date(message.timestamp).toLocaleTimeString(
                                [],
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Message Input - Fixed at bottom */}
                  <div className="flex-none border-t bg-background p-4">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) =>
                          e.key === "Enter" && handleSendMessage()
                        }
                      />
                      <Button size="icon" onClick={handleSendMessage}>
                        <PaperPlaneIcon className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <SmileIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                  <div className="mb-4 rounded-full bg-muted p-6">
                    <PaperPlaneIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium">Your Messages</h3>
                  <p className="mt-2 text-muted-foreground">
                    Select a conversation to start messaging
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
