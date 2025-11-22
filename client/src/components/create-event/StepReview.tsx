import { useState } from 'react';
import { createPageUrl } from '@/lib/pageUtils';
import { api } from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MessageSquare, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { format } from 'date-fns';
import { useLocation } from 'wouter';

interface StepReviewProps {
    data: any;
    onBack: () => void;
}

export default function StepReview({ data, onBack }: StepReviewProps) {
    const [, setLocation] = useLocation();
    const [isLaunching, setIsLaunching] = useState(false);
    const [launchSuccess, setLaunchSuccess] = useState(false);

    const launchEvent = async () => {
        setIsLaunching(true);
        try {
            // 1. Create Event
            const event = await api.events.create({
                name: data.name,
                date: data.date,
                venue: data.venue,
                invitation_message: data.invitation_message,
                start_time: data.start_time,
                end_time: data.end_time,
                dress_code: data.dress_code,
            });

            // 2. Create Guests (Bulk)
            if (data.guests && data.guests.length > 0) {
                const guestsPayload = data.guests.map((g: any) => ({
                    name: g.name,
                    phone_number: g.phone_number,
                    messaging_preference: g.messaging_preference || 'whatsapp',
                    event_id: event.event_id,
                    invitations_sent_out: false,
                    rsvp_status: 'pending' as const
                }));
                await api.guests.bulkCreate(guestsPayload);
            }

            // 3. Create Event Status
            await api.eventStatus.upsert({
                event_id: event.event_id,
                invitations_sent: 0,
                total_guests: data.guests?.length || 0,
                total_confirmed: 0,
                total_pending: data.guests?.length || 0,
                total_declined: 0,
                invitations_sent_out: false,
                rsvp_reminder_stage: 0,
                rsvp_reminder_date: data.rsvp_reminder_date
            });

            setLaunchSuccess(true);
            // Redirect after delay
            setTimeout(() => {
                setLocation(createPageUrl('Events'));
            }, 2000);

        } catch (error) {
            console.error("Failed to launch event", error);
            // Handle error (toast, etc.)
        } finally {
            setIsLaunching(false);
        }
    };

    if (launchSuccess) {
        return (
            <div className="text-center py-20">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Event Launched!</h2>
                <p className="text-slate-500">Redirecting to your dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Review & Launch</h2>
            <p className="text-slate-500">Double check everything before we set it live.</p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Event Details */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-emerald-500" />
                            Event Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div>
                            <p className="text-slate-500">Event Name</p>
                            <p className="font-medium">{data.name}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Date & Time</p>
                            <p className="font-medium">{data.date ? format(new Date(data.date), 'PPP p') : '-'}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Venue</p>
                            <p className="font-medium">{data.venue}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Guest Summary */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Users className="w-5 h-5 text-emerald-500" />
                            Guest List
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="flex justify-between items-center border-b pb-2">
                            <span className="text-slate-500">Total Guests</span>
                            <span className="font-bold text-lg">{data.guests?.length || 0}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                            <span className="text-slate-500">SMS Preference</span>
                            <span className="font-medium">{data.guests?.filter((g: any) => g.messaging_preference === 'sms').length || 0}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-slate-500">WhatsApp Preference</span>
                            <span className="font-medium">{data.guests?.filter((g: any) => g.messaging_preference === 'whatsapp').length || 0}</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Message Preview */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-emerald-500" />
                            Invitation
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                         <div>
                            <p className="text-slate-500 mb-1">Message</p>
                            <p className="bg-slate-50 p-3 rounded-md italic text-slate-700 border">
                                "{data.invitation_message}"
                            </p>
                        </div>
                        {data.invitation_image_url && (
                            <div>
                                <p className="text-slate-500 mb-1">Image</p>
                                <img src={data.invitation_image_url} alt="Invitation" className="h-20 rounded-md object-cover" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Schedule */}
                <Card>
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-medium flex items-center gap-2">
                            <Clock className="w-5 h-5 text-emerald-500" />
                            Schedule
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div>
                            <p className="text-slate-500">Send Invitations</p>
                            <p className="font-medium">{data.invitation_send_date ? format(new Date(data.invitation_send_date), 'PPP p') : '-'}</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Send RSVP Reminder</p>
                            <p className="font-medium">{data.rsvp_reminder_date ? format(new Date(data.rsvp_reminder_date), 'PPP p') : '-'}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="flex justify-between pt-8">
                <Button variant="outline" onClick={onBack} disabled={isLaunching}>Back</Button>
                <Button 
                    onClick={launchEvent} 
                    disabled={isLaunching}
                    className="bg-emerald-500 hover:bg-emerald-600 h-12 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                    {isLaunching ? (
                        <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Launching Event...
                        </>
                    ) : (
                        "Launch Event"
                    )}
                </Button>
            </div>
        </div>
    );
}