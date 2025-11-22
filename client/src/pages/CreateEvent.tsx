import { useState } from 'react';
import { Check } from "lucide-react";
import StepBasicInfo from '@/components/create-event/StepBasicInfo';
import StepInvitation from '@/components/create-event/StepInvitationInfo';
import StepGuests from '@/components/create-event/StepGuests';
import StepScheduling from '@/components/create-event/StepScheduling';
import StepReview from '@/components/create-event/StepReview';

const STEPS = ['Basic Info', 'Invitation', 'Guests', 'Scheduling', 'Review'];

interface FormData {
    name: string;
    date: string;
    venue: string;
    invitation_message: string;
    invitation_image_url: string;
    guests: any[];
    invitation_send_date: string;
    rsvp_reminder_date: string;
}

export default function CreateEvent() {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<FormData>({
        // Basic
        name: '',
        date: '',
        venue: '',
        // Invitation
        invitation_message: "You're invited to celebrate with us!",
        invitation_image_url: '',
        // Guests
        guests: [],
        // Scheduling
        invitation_send_date: '',
        rsvp_reminder_date: '',
    });

    const updateFormData = (data: Partial<FormData>) => {
        setFormData(prev => ({ ...prev, ...data }));
    };

    const nextStep = () => {
        if (currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (currentStep > 0) setCurrentStep(prev => prev - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return <StepBasicInfo data={formData} onUpdate={updateFormData} onNext={nextStep} />;
            case 1:
                return <StepInvitation data={formData} onUpdate={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 2:
                return <StepGuests data={formData} onUpdate={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 3:
                return <StepScheduling data={formData} onUpdate={updateFormData} onNext={nextStep} onBack={prevStep} />;
            case 4:
                return <StepReview data={formData} onBack={prevStep} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Progress Bar */}
            <div className="bg-white border-b border-slate-200 sticky top-16 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between relative">
                        {STEPS.map((step, index) => (
                            <div key={index} className="flex flex-col items-center relative z-10">
                                <div 
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300 ${
                                        index <= currentStep ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                                    }`}
                                >
                                    {index < currentStep ? <Check className="w-4 h-4" /> : index + 1}
                                </div>
                                <span className={`text-xs mt-2 font-medium ${index <= currentStep ? 'text-emerald-600' : 'text-slate-400'}`}>
                                    {step}
                                </span>
                            </div>
                        ))}
                        {/* Connecting Line */}
                        <div className="absolute top-4 left-0 w-full h-[2px] bg-slate-200 -z-0 transform -translate-y-1/2">
                            <div 
                                className="h-full bg-emerald-500 transition-all duration-300"
                                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                {renderStep()}
            </div>
        </div>
    );
}