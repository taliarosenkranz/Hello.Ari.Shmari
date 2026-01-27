import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Search, RefreshCcw, Filter, CheckCircle2, Loader2 } from "lucide-react";
import { Guest } from '@/lib/supabase';
import { guests as guestsApi } from '@/lib/api';
import { useMutation } from '@tanstack/react-query';

export default function GuestTable({ guests, onRefresh }: { guests: Guest[], onRefresh: () => void }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [channelFilter, setChannelFilter] = useState('all');
    const [updatingGuestId, setUpdatingGuestId] = useState<number | null>(null);

    // Mutation for updating guest status
    const updateStatusMutation = useMutation({
        mutationFn: async ({ guestId, status }: { guestId: number; status: string }) => {
            return guestsApi.update(String(guestId), { rsvp_status: status as 'pending' | 'confirmed' | 'declined' });
        },
        onSuccess: () => {
            onRefresh();
            setUpdatingGuestId(null);
        },
        onError: (error) => {
            console.error('Error updating guest status:', error);
            setUpdatingGuestId(null);
        }
    });

    const handleStatusChange = (guestId: number, newStatus: string) => {
        setUpdatingGuestId(guestId);
        updateStatusMutation.mutate({ guestId, status: newStatus });
    };

    // Filter Logic
    const filteredGuests = guests.filter((guest: Guest) => {
        const matchesSearch = 
            guest.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            guest.phone_number.includes(searchTerm);
        
        // Handle status filtering - treat null/empty as pending
        let matchesStatus = false;
        if (statusFilter === 'all') {
            matchesStatus = true;
        } else if (statusFilter === 'pending') {
            matchesStatus = !guest.rsvp_status || guest.rsvp_status === 'pending';
        } else {
            matchesStatus = guest.rsvp_status === statusFilter;
        }
        
        const matchesChannel = channelFilter === 'all' || guest.messaging_preference === channelFilter;
        
        return matchesSearch && matchesStatus && matchesChannel;
    });

    const exportCSV = () => {
        const headers = ['Name', 'Phone', 'Preference', 'Invitation Sent', 'RSVP Status', 'Last Updated'];
        const csvContent = [
            headers.join(','),
            ...filteredGuests.map((g: Guest) => [
                g.name,
                g.phone_number,
                g.messaging_preference,
                g.invitation_received ? 'Yes' : 'No',
                g.rsvp_status,
                g.updated_date || ''
            ].join(','))
        ].join('\n');

        const encodedUri = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "guest_list.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getStatusBadge = (status: string | undefined | null) => {
        switch(status) {
            case 'confirmed':
                return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">Confirmed</Badge>;
            case 'declined':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-200">Declined</Badge>;
            default:
                return <Badge variant="outline" className="text-amber-600 border-amber-200">Pending</Badge>;
        }
    };

    return (
        <Card className="h-full">
            <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <CardTitle className="text-lg">Guest List</CardTitle>
                <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-none sm:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="Search guests..."
                            className="pl-9 h-9"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="sm" onClick={onRefresh}>
                        <RefreshCcw className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportCSV}>
                        <Download className="h-4 w-4 mr-2" />
                        Export
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                     <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                            <div className="flex items-center gap-2">
                                <Filter className="w-3 h-3" />
                                <SelectValue placeholder="Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="declined">Declined</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                        </SelectContent>
                    </Select>
                    
                    <Select value={channelFilter} onValueChange={setChannelFilter}>
                        <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue placeholder="Channel" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Channels</SelectItem>
                            <SelectItem value="sms">SMS</SelectItem>
                            <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="hidden md:table-cell">Channel</TableHead>
                                <TableHead className="hidden sm:table-cell">Invited</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredGuests.length > 0 ? (
                                filteredGuests.map((guest: Guest) => (
                                    <TableRow key={guest.guest_id}>
                                        <TableCell>
                                            <div className="font-medium">{guest.name}</div>
                                            <div className="text-xs text-slate-500">{guest.phone_number}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Select
                                                value={guest.rsvp_status || 'pending'}
                                                onValueChange={(value) => handleStatusChange(guest.guest_id, value)}
                                                disabled={updatingGuestId === guest.guest_id}
                                            >
                                                <SelectTrigger className="h-7 w-[120px] border-0 bg-transparent p-0 focus:ring-0">
                                                    {updatingGuestId === guest.guest_id ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <SelectValue>
                                                            {getStatusBadge(guest.rsvp_status)}
                                                        </SelectValue>
                                                    )}
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="pending">
                                                        <Badge variant="outline" className="text-amber-600 border-amber-200">Pending</Badge>
                                                    </SelectItem>
                                                    <SelectItem value="confirmed">
                                                        <Badge className="bg-emerald-100 text-emerald-700">Confirmed</Badge>
                                                    </SelectItem>
                                                    <SelectItem value="declined">
                                                        <Badge className="bg-red-100 text-red-700">Declined</Badge>
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell capitalize text-sm">
                                            {guest.messaging_preference}
                                        </TableCell>
                                        <TableCell className="hidden sm:table-cell">
                                            {guest.invitation_received || guest.invitation_sent ? (
                                                <span className="text-emerald-600 text-xs flex items-center gap-1">
                                                    <CheckCircle2 className="w-3 h-3" /> Sent
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-xs">Draft</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                                <span className="sr-only">Menu</span>
                                                <div className="w-4 h-4 bg-slate-400 rounded-full" /> 
                                                {/* Placeholder for edit actions */}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-24 text-center text-slate-500">
                                        No guests found.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="mt-4 text-xs text-slate-500 text-center">
                    Showing {filteredGuests.length} of {guests.length} guests
                </div>
            </CardContent>
        </Card>
    );
}