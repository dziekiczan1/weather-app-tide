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
import { addCity } from "@/actions/city";
import { useId, useState, useTransition } from "react";
import { FormAlert } from "@/components/form-alert";

export const CityForm = () => {
  const formId = useId();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof CitySchema>>({
    resolver: zodResolver(CitySchema),
    defaultValues: {
      name: "",
      country: "",
    },
  });

  const onSubmit = (values: z.infer<typeof CitySchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addCity(values)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

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
                  id={`${formId}-name`}
                  disabled={isPending}
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
                Country
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={`${formId}-country`}
                  disabled={isPending}
                  placeholder="Enter country code (PL, US)"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 rounded-md h-12 transition-all duration-200 hover:bg-white/10"
                  type="text"
                  maxLength={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormAlert message={error} variant="error" />
        <FormAlert message={success} variant="success" />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-md shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40"
        >
          {isPending ? "Adding..." : "Confirm"}
        </Button>
      </form>
    </Form>
  );
};
