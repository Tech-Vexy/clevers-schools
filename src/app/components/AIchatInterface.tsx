'use client';
import { Button } from '@/components/ui/button';
import { useState,useEffect } from 'react';
import { DialogTrigger ,Dialog} from '@radix-ui/react-dialog';
import { MessageCircle,Send,Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
interface Message {
    role: 'user' | 'assistant';
    content: string;
}

const AIChatInterface = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isPulsing, setIsPulsing] = useState(true);


    useEffect(() => {
        const pulseInterval = setInterval(() => {
            setIsPulsing(prev => !prev);
        }, 2000);

        return () => clearInterval(pulseInterval);
    }, []);
    const sendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            setIsLoading(true);
            const userMessage: Message = { role: 'user', content: input };
            setMessages(prev => [...prev, userMessage]);
            setInput('');

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await response.json();

            setMessages(prev => [...prev, {
                role: 'assistant',
                content: data.content[0].text,
            }]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };
    const handleClearChat = () => {
        setMessages([]);
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-gray-100 rounded-lg shadow-xl w-full max-w-3xl h-[80vh] flex flex-col m-4">
                        <div className="flex justify-between items-center p-6 border-b bg-headersc">
                            <h2 className='flex '>
                                <Image src={'/image.png'} width={48} alt='logo' height={48} />
                                <span className="text-2xl  font-bold">CLEVERS AI ASSISTANT</span>
                                <p>Powered by <Link href="https://www.anthropic.com/"><span className='text-stone-950 text-2xl font-semibold'>ANTHROPIC</span></Link></p>
                            </h2>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleClearChat}
                                title="Clear chat"
                                className="p-3 bg-gray-400"
                            >
                                <Trash2 className="w-5 h-5 " />
                            </Button>

                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500  hover:text-gray-700 text-2xl font-semibold"
                            >
                                ×
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-6">
                            {messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-4 rounded-lg ${
                                        message.role === 'user'
                                            ? 'bg-blue-100 ml-auto max-w-[80%]'
                                            : 'bg-gray-100 mr-auto max-w-[80%]'
                                    }`}
                                >
                                    <div className="text-sm text-gray-600 mb-1">
                                        {message.role === 'user' ? 'You' : 'AI Assistant'}
                                    </div>
                                    {message.content}
                                </div>
                            ))}
                        </div>

                        <form onSubmit={sendMessage} className="p-6 border-t">
                            <div className="flex gap-3">
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type your question..."
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();

                                        }
                                    }}
                                    disabled={isLoading}
                                    className="flex-1 text-lg p-6"
                                />
                                <Button
                                    onClick={sendMessage}
                                    disabled={isLoading || (!input.trim())}
                                    size="lg"
                                    className="p-6 w-16 bg-navbar"
                                >
                                    <Send className="w-24 h-24 " />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        className={`fixed  bottom-6 right-6 shadow-lg bg-blue-800 text-headertext
            transform transition-all duration-300 ease-in-out p-6
            ${isPulsing ? 'scale-110 shadow-xl' : 'scale-100 shadow-lg'}
            hover:scale-105 hover:bg-gray-800 group`}
                    >
                        <MessageCircle className={`w-6 h-6 mr-3 transition-transform duration-300 
            ${isPulsing ? 'rotate-12' : 'rotate-0'}
            group-hover:rotate-12`}
                        />
                        <span className="text-xl font-semibold">Ask AI</span>
                    </Button>
                </DialogTrigger>
            </Dialog>
        </div>
    );
};

export default AIChatInterface;