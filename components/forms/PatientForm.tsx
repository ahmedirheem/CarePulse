"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"

import { Form } from "@/components/ui/form"
import { createUser } from "@/lib/actions/patient.actions"
import { UserFormValidation } from "@/lib/validation"

import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"

export enum formFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

function PatientForm() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true)

    try {
      const user = { 
        name: values.name, 
        email: values.email, 
        phone: values.phone 
      };

      console.log(user, 'before creation');
      

      const newUser = await createUser(user);
      console.log("User from form", newUser);


      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`)
      }

    } catch (error) {
      console.log(error);
    }
    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">

        <section className="mb-12 space-y-4">
          <h1 className="header">Hi There 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>

        <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />

        <CustomFormField
          fieldType={formFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email address"
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />

        <CustomFormField
          fieldType={formFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="+(555) 123-4567"
        />

        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm;
