'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Checkbox } from '@/components/ui/checkbox'
import Image from 'next/image'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import { Event } from '@/lib/types'

const eventFormSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  description: z.string().optional(),
  date: z.date(),
  end_date: z.date().optional(),
  location: z.string().optional(),
  virtual_link: z.string().url('Must be a valid URL').optional(),
  is_virtual: z.boolean().default(false),
  image_url: z.string().url('Must be a valid URL').optional(),
  registration_link: z.string().url('Must be a valid URL').optional(),
  time: z.string().optional(),
  capacity: z.number().int().positive().optional(),
  status: z.enum(['scheduled', 'ongoing', 'completed', 'cancelled']).default('scheduled'),
  tags: z.array(z.string()).optional()
})

export function EventForm({ 
  initialData,
  onSubmit,
  onCancel
}: {
  initialData?: Partial<Event>
  onSubmit: (values: z.infer<typeof eventFormSchema>) => void
  onCancel: () => void
}) {
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialData?.title || '',
      description: initialData?.description || '',
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      location: initialData?.location || '',
      registration_link: initialData?.registration_link || '',
      image_url: initialData?.image_url || ''
    }
  })

  return (
    <div className="flex flex-col h-[calc(100vh-200px)]">
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-6 overflow-y-auto flex-1 p-4"
        >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter event description"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-[240px] pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="is_virtual"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Virtual Event</FormLabel>
              </div>
            </FormItem>
          )}
        />

        {form.watch('is_virtual') ? (
          <FormField
            control={form.control}
            name="virtual_link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Virtual Event Link</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="https://zoom.us/your-meeting" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : (
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Enter event location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className="w-[240px] pl-3 text-left font-normal"
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick end date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Time</FormLabel>
              <FormControl>
                <Input 
                  type="time"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input 
                  type="number"
                  min={1}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input 
                  placeholder="Comma separated tags"
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim())
                    field.onChange(tags)
                  }}
                  value={field.value?.join(', ') || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="registration_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Link</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/register" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event Image URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/event-image.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
              {field.value && (
                <div className="mt-2">
                  <Image
                    src={field.value}
                    alt="Event preview"
                    width={256}
                    height={256}
                    className="w-64 h-64 object-cover rounded-lg"
                  />
                </div>
              )}
            </FormItem>
          )}
        />
        
          <div className="sticky bottom-0 bg-background border-t p-4">
            <div className="flex justify-end gap-4">
              <Button 
                type="button" 
                variant="outline"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-pink-600 hover:bg-pink-700"
                onClick={form.handleSubmit(onSubmit)}
              >
                Save Event
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
