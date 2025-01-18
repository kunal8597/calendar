'use client';

import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/mode-toggle';
import { addDays, startOfYear, isBefore, isToday, format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState } from 'react';
import { Tooltip } from '@/components/ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Squares } from '@/components/ui/squares-background';
import { GlowingStarsBackgroundCard } from '@/components/ui/glowing-background-stars-card';
import { GlowEffect } from '@/components/ui/glow-effect';

export default function Home() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [previewDate, setPreviewDate] = useState<Date | null>(null);
  const today = new Date();

  const getDaysInYear = (year: number) => 365 + (year % 4 === 0 ? 1 : 0);
  
  const getCompletedDays = (year: number) => {
    const startDate = startOfYear(new Date(year, 0, 1));
    const referenceDate = previewDate || today;
    if (year > referenceDate.getFullYear()) return 0;
    if (year < referenceDate.getFullYear()) return getDaysInYear(year);
    return Math.floor((referenceDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const getDotsForYear = (year: number) => {
    const startDate = startOfYear(new Date(year, 0, 1));
    const daysInYear = getDaysInYear(year);
    const referenceDate = previewDate || today;

    return Array.from({ length: daysInYear }, (_, index) => {
      const currentDate = addDays(startDate, index);
      const isCompleted = isBefore(currentDate, referenceDate) || currentDate.getTime() === referenceDate.getTime();
      const isCurrentDay = isToday(currentDate);
      const isPreview = previewDate && currentDate.getTime() === previewDate.getTime();
      return { date: currentDate, isCompleted, isCurrentDay, isPreview };
    });
  };

  return (
     
    
    <TooltipProvider>
      
      <div className="min-h-screen flex items-center justify-center p-4 ">
        <ModeToggle />

      
       
        <div className="w-full max-w-3xl p-4 relative ">

        <div className="flex items-center justify-between mb-8 z-20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedYear(prev => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold">{selectedYear}</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedYear(prev => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative"> {/* Glow + Card Wrapper */}
            <div className="absolute inset-0 z-0"> {/* Glow Effect */}
              <GlowEffect
                colors={['#0894FF', '#C959DD', '#FF2E54', '#FF9004']}
                mode="static"
                blur="medium"
              />
            </div>
     
      
           
          <Card className="p-8 relative ">
           
            
            <div 
              className="grid grid-cols-15 gap-2"
              onMouseLeave={() => setPreviewDate(null)}
            >
              {getDotsForYear(selectedYear).map((dot, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <div
                      onMouseEnter={() => setPreviewDate(dot.date)}
                      onTouchStart={() => setPreviewDate(dot.date)}
                      onTouchEnd={() => setPreviewDate(null)}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer hover:scale-150 ${
                        dot.isPreview
                          ? 'bg-primary scale-150'
                          : dot.isCurrentDay
                          ? 'bg-primary'
                          : dot.isCompleted
                          ? 'bg-primary'
                          : 'bg-primary/20'
                      }`}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">{format(dot.date, 'MMMM d, yyyy')}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-sm text-muted-foreground mt-8">
              <div className="flex gap-4">
                <span>{getCompletedDays(selectedYear)} days completed</span>
                <span>•</span>
                <span>{((getCompletedDays(selectedYear) / getDaysInYear(selectedYear)) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </Card>
        </div>
        
        {previewDate && (
          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-full shadow-lg text-sm animate-in fade-in slide-in-from-bottom-4">
            {format(previewDate, 'EEEE, MMMM d, yyyy')}
          </div>
        )}
        </div>
      </div>


      
      
      <div className="flex items-center justify-center mb-20 ">
        <p className="text-sm text-muted-foreground">
          Made by: {' '}
          <a
            href="https://kunalm.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-primary underline hover:text-primary-hover"
          >
            Kunal Mathur
          </a>
        </p>
      </div>
    </TooltipProvider>

    
  
    
   
  );
}