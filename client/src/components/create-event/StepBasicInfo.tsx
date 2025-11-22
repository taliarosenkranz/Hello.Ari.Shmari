import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const schema = z.object({
    name: z.string().min(2, "Event name is required"),
    date: z.string().min(1, "Date is required"),
    venue: z.string().min(2, "Venue is required"),
});

export default function StepBasicInfo({ data, onUpdate, onNext }) {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            name: data.name,
            date: data.date ? new Date(data.date).toISOString().slice(0, 16) : '',
            venue: data.venue,
        },
        mode: 'onChange'
    });

    const onSubmit = (formData) => {
        onUpdate(formData);
        onNext();
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Event Name</Label>
                        <Input id="name" {...register('name')} placeholder="e.g. Annual Gala 2024" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Date & Time</Label>
                        <Input type="datetime-local" id="date" {...register('date')} />
                        {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="venue">Venue</Label>
                        <Input id="venue" {...register('venue')} placeholder="e.g. Grand Hotel Ballroom" />
                        {errors.venue && <p className="text-sm text-red-500">{errors.venue.message}</p>}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={!isValid} className="bg-emerald-500 hover:bg-emerald-600">
                            Next Step
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}