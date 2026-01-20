import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, UserCheck, Send, Clock } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';

export default function ActivityFeed({ guests }) {
    // Mock activity derivation from guest states
    const activities = [];

    guests.forEach(g => {
        if (g.invitation_received) {
            activities.push({
                type: 'invite_sent',
                text: `Invitation sent to ${g.name}`,
                time: g.updated_date || g.created_date, // Using record update time as proxy
                icon: Send,
                color: 'text-blue-500 bg-blue-50'
            });
        }
        if (g.rsvp_status === 'confirmed') {
            activities.push({
                type: 'rsvp_confirmed',
                text: `${g.name} confirmed!`,
                time: null, // guests table doesn't have updated_date
                icon: UserCheck,
                color: 'text-emerald-500 bg-emerald-50'
            });
        }
        if (g.rsvp_status === 'declined') {
             activities.push({
                type: 'rsvp_declined',
                text: `${g.name} declined invitation`,
                time: g.updated_date,
                icon: MessageCircle,
                color: 'text-red-500 bg-red-50'
            });
        }
    });

    // Sort by time descending and take top 10
    const sortedActivities = activities
        .sort((a, b) => new Date(b.time) - new Date(a.time))
        .slice(0, 10);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {sortedActivities.length > 0 ? (
                        sortedActivities.map((activity, i) => {
                            const Icon = activity.icon;
                            return (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${activity.color}`}>
                                        <Icon className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-slate-900 truncate">{activity.text}</p>
                                        <p className="text-xs text-slate-500 flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {activity.time ? formatDistanceToNow(new Date(activity.time), { addSuffix: true }) : 'Just now'}
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center text-slate-500 py-8 text-sm">
                            No recent activity recorded.
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}