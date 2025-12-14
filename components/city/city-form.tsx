"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CitySchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

export const CityForm = () => {
  const form = useForm<z.infer<typeof CitySchema>>({
    resolver: zodResolver(CitySchema),
    defaultValues: {
      name: "",
      country: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CitySchema>) => {};

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                City Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter city name"
                  type="text"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-md h-12 transition-all duration-200 hover:bg-white/10"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                Country (optional)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter country code (PL, US)"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-md h-12 transition-all duration-200 hover:bg-white/10"
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-md shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40"
        >
          Confirm
        </Button>
      </form>
    </Form>
  );
};
