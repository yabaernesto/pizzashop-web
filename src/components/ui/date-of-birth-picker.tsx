'use client';

import * as React from 'react';
// Adicione 'format' para formatar a data no botão
import { format } from 'date-fns';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface DateOfBirthPickerProps extends React.ComponentProps<'div'> {
  date: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export function DateOfBirthPicker({
  date,
  onDateChange,
  ...props
}: DateOfBirthPickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3" {...props}>
      <Label htmlFor="date" className="px-1">
        Date of birth
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className="w-48 justify-between font-normal"
          >
            {/* Formata a data para exibição (ex: Junho 25, 1990) */}
            {date ? format(date, 'PPP') : 'Select date'}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            onSelect={(selectedDate) => {
              onDateChange(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
