import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Send, CheckCircle2, XCircle, HelpCircle } from "lucide-react";

export default function KPIGrid({ guests, eventStatus }) {
    const totalGuests = guests.length;
    const invitationsSent = guests.filter(g => g.invitation_received).length;
    const confirmed = guests.filter(g => g.rsvp_status === 'attending').length;
    const declined = guests.filter(g => g.rsvp_status === 'declined').length;
    const pending = guests.filter(g => g.rsvp_status === 'pending').length;

    const rsvpRate = totalGuests > 0 ? Math.round((confirmed / totalGuests) * 100) : 0;
    const sentDate = eventStatus?.invitation_send_date ? new Date(eventStatus.invitation_send_date).toLocaleString() : 'Not sent yet';

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Guests</CardTitle>
                    <Users className="h-4 w-4 text-slate-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalGuests}</div>
                    <p className="text-xs text-slate-500">
                        Target for event
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Invitations Sent</CardTitle>
                    <Send className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{invitationsSent} / {totalGuests}</div>
                    <p className="text-xs text-slate-500 truncate" title={sentDate}>
                        {eventStatus?.invitations_sent_out ? `Sent on ${new Date(sentDate).toLocaleDateString()}` : 'Draft / Not sent'}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Confirmed</CardTitle>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{confirmed}</div>
                    <p className="text-xs text-slate-500">
                        {rsvpRate}% acceptance rate
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Response</CardTitle>
                    <HelpCircle className="h-4 w-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{pending}</div>
                    <p className="text-xs text-slate-500">
                        {declined} declined
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}