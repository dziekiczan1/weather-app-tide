"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useState, useTransition, useEffect } from "react";
import { X } from "lucide-react";

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
import { addCity, updateCity } from "@/actions/city";
import { FormAlert } from "@/components/form-alert";
import { CityFormProps } from "@/components/city/types";

export const CityForm = ({
  editingCity,
  onCancelEdit,
  onAddSuccess,
  onSuccess,
}: CityFormProps) => {
  const formId = useId();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const isEditing = !!editingCity;

  const defaultFormValues = {
    name: "",
    country: "",
  };

  const form = useForm<z.infer<typeof CitySchema>>({
    resolver: zodResolver(CitySchema),
    defaultValues: defaultFormValues,
  });

  useEffect(() => {
    if (editingCity) {
      form.reset({
        name: editingCity.name,
        country: editingCity.country,
      });
      setError("");
      setSuccess("");
    } else {
      form.reset(defaultFormValues);
    }
  }, [editingCity, form]);

  const onSubmit = (values: z.infer<typeof CitySchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        if (isEditing && editingCity) {
          const data = await updateCity(editingCity.id, values);

          if (data?.error) {
            setError(data.error);
            return;
          }

          if (data?.success) {
            setSuccess(data.success);
            onSuccess?.({
              id: editingCity.id,
              name: values.name.toLowerCase(),
              country: values.country.toUpperCase(),
            });
            onCancelEdit?.();
          }
        } else {
          const data = await addCity(values);

          if (data?.error) {
            setError(data.error);
            return;
          }

          if (data?.success && data.city) {
            form.reset(defaultFormValues);
            setSuccess(data.success);
            onAddSuccess?.(data.city);
          }
        }
      } catch {
        setError("Something went wrong");
      }
    });
  };

  const handleCancel = () => {
    form.reset(defaultFormValues);
    setError("");
    setSuccess("");
    onCancelEdit?.();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        {isEditing && (
          <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
            <span className="text-sm text-purple-300">
              Editing:{" "}
              <span className="font-medium capitalize">
                {editingCity?.name}
              </span>
            </span>
            <button
              type="button"
              onClick={handleCancel}
              className="p-1 hover:bg-white/10 rounded transition-colors"
            >
              <X className="w-4 h-4 text-slate-400 hover:text-white" />
            </button>
          </div>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-300 text-sm font-medium">
                City name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id={`${formId}-name`}
                  disabled={isPending}
                  placeholder="Enter city name"
                  type="text"
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 rounded-md h-12 transition-all duration-200 hover:bg-white/10 capitalize placeholder:normal-case"
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
                  className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 rounded-md h-12 transition-all duration-200 hover:bg-white/10 uppercase placeholder:normal-case"
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

        <div className="flex gap-3">
          {isEditing && (
            <Button
              type="button"
              onClick={handleCancel}
              disabled={isPending}
              variant="ghost"
              className="flex-1 h-12 text-slate-300 hover:text-white hover:bg-white/10"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isPending}
            className={`${isEditing ? "flex-1" : "w-full"} h-12 bg-gradient-to-r from-purple-500 to-indigo-500 hover: from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-md shadow-lg shadow-purple-500/25 transition-all duration-200 hover:shadow-purple-500/40`}
          >
            {isPending
              ? isEditing
                ? "Saving..."
                : "Adding..."
              : isEditing
                ? "Save Changes"
                : "Add City"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
