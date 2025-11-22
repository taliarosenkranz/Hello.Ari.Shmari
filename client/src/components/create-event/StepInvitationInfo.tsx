import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, ImageIcon } from "lucide-react";

interface StepInvitationProps {
    data: any;
    onUpdate: (data: any) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function StepInvitation({ data, onUpdate, onNext, onBack }: StepInvitationProps) {
    const [message, setMessage] = useState(data.invitation_message);
    const [image, setImage] = useState(data.invitation_image_url);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // For now, use local preview (TODO: implement Supabase storage upload)
        const objectUrl = URL.createObjectURL(file);
        setImage(objectUrl);
        onUpdate({ invitation_image_url: objectUrl });
    };

    const handleNext = () => {
        onUpdate({ invitation_message: message, invitation_image_url: image });
        onNext();
    };

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Invitation Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Invitation Message</Label>
                        <Textarea 
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Enter your invitation message..."
                            className="min-h-[150px]"
                        />
                        <p className="text-xs text-slate-500">
                            Use placeholders like {"{guest_name}"}, {"{event_name}"}, {"{date}"}, {"{venue}"}.
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label>Invitation Image</Label>
                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-2">
                                <Upload className="w-8 h-8 text-slate-400" />
                                <p className="text-sm font-medium text-slate-700">Click to upload image</p>
                                <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
                            </div>
                        </div>
                        {image && (
                            <div className="mt-4 relative rounded-lg overflow-hidden h-40 w-full bg-slate-100">
                                <img src={image} alt="Preview" className="w-full h-full object-cover" />
                                <Button 
                                    variant="destructive" 
                                    size="icon" 
                                    className="absolute top-2 right-2 h-6 w-6"
                                    onClick={() => {
                                        setImage('');
                                        onUpdate({ invitation_image_url: '' });
                                    }}
                                >
                                    <span className="sr-only">Remove</span>
                                    ×
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between pt-4">
                        <Button variant="outline" onClick={onBack}>Back</Button>
                        <Button onClick={handleNext} className="bg-emerald-500 hover:bg-emerald-600">Next Step</Button>
                    </div>
                </CardContent>
            </Card>

            {/* Preview */}
            <div className="flex justify-center">
                <div className="w-[300px] h-[600px] bg-white border-8 border-slate-900 rounded-[3rem] shadow-2xl overflow-hidden relative flex flex-col">
                    <div className="bg-slate-100 p-4 border-b text-center text-xs font-medium text-slate-500">
                        Message Preview
                    </div>
                    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
                        <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-sm max-w-[85%] mb-4">
                            <p className="text-sm text-slate-800">
                                {message
                                    .replace('{guest_name}', 'John Doe')
                                    .replace('{event_name}', data.name || 'Event Name')
                                    .replace('{date}', data.date ? new Date(data.date).toLocaleDateString() : 'Date')
                                    .replace('{venue}', data.venue || 'Venue')
                                }
                            </p>
                            {image && (
                                <img src={image} alt="Invitation" className="mt-2 rounded-md w-full" />
                            )}
                            <span className="text-[10px] text-slate-400 mt-1 block text-right">10:42 AM</span>
                        </div>
                    </div>
                    {/* Mock input area */}
                    <div className="p-3 bg-white border-t flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                            <ImageIcon className="w-3 h-3 text-emerald-600" />
                        </div>
                        <div className="h-8 bg-slate-100 rounded-full flex-1" />
                    </div>
                </div>
            </div>
        </div>
    );
}