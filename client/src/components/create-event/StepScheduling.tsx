import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
    invitation_send_date: z.string().min(1, "Invitation send date is required"),
    rsvp_reminder_date: z.string().min(1, "RSVP reminder date is required"),
}).refine(data => {
    return new Date(data.rsvp_reminder_date) > new Date(data.invitation_send_date);
}, {
    message: "Reminder date must be after invitation date",
    path: ["rsvp_reminder_date"]
});

export default function StepScheduling({ data, onUpdate, onNext, onBack }) {
    const { register, handleSubmit, watch, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            invitation_send_date: data.invitation_send_date ? new Date(data.invitation_send_date).toISOString().slice(0, 16) : '',
            rsvp_reminder_date: data.rsvp_reminder_date ? new Date(data.rsvp_reminder_date).toISOString().slice(0, 16) : '',
        },
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        onUpdate(formData);
        onNext();
    };

    // For timeline visualization
    const inviteDate = watch('invitation_send_date');
    const reminderDate = watch('rsvp_reminder_date');
    const eventDate = data.date;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="invitation_send_date">Send Invitations On</Label>
                            <Input type="datetime-local" id="invitation_send_date" {...register('invitation_send_date')} />
                            {errors.invitation_send_date && <p className="text-sm text-red-500">{errors.invitation_send_date.message}</p>}
                            <p className="text-xs text-slate-500">When should guests receive the invitation?</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="rsvp_reminder_date">Send RSVP Reminder On</Label>
                            <Input type="datetime-local" id="rsvp_reminder_date" {...register('rsvp_reminder_date')} />
                            {errors.rsvp_reminder_date && <p className="text-sm text-red-500">{errors.rsvp_reminder_date.message}</p>}
                            <p className="text-xs text-slate-500">We'll follow up with pending guests automatically.</p>
                        </div>
                    </div>

                    {/* Timeline Visualization */}
                    {(inviteDate && reminderDate && eventDate) && (
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mt-6">
                            <h3 className="text-sm font-semibold text-slate-900 mb-4">Event Timeline</h3>
                            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
                                {/* Connecting Line (Desktop) */}
                                <div className="hidden md:block absolute top-5 left-0 w-full h-0.5 bg-slate-200 -z-0" />
                                {/* Connecting Line (Mobile) */}
                                <div className="md:hidden absolute left-5 top-0 h-full w-0.5 bg-slate-200 -z-0" />

                                <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto">
                                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border-4 border-white shadow-sm">
                                        <span className="text-emerald-600 font-bold text-xs">1</span>
                                    </div>
                                    <div className="text-left md:text-center">
                                        <p className="font-medium text-sm">Invitations Sent</p>
                                        <p className="text-xs text-slate-500">{new Date(inviteDate).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border-4 border-white shadow-sm">
                                        <span className="text-blue-600 font-bold text-xs">2</span>
                                    </div>
                                    <div className="text-left md:text-center">
                                        <p className="font-medium text-sm">RSVP Reminder</p>
                                        <p className="text-xs text-slate-500">{new Date(reminderDate).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="relative z-10 flex md:flex-col items-center gap-4 md:gap-2 w-full md:w-auto">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center border-4 border-white shadow-sm">
                                        <span className="text-purple-600 font-bold text-xs">3</span>
                                    </div>
                                    <div className="text-left md:text-center">
                                        <p className="font-medium text-sm">Event Day</p>
                                        <p className="text-xs text-slate-500">{new Date(eventDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between pt-4">
                        <Button type="button" variant="outline" onClick={onBack}>Back</Button>
                        <Button type="submit" disabled={!isValid} className="bg-emerald-500 hover:bg-emerald-600">
                            Review & Launch
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}